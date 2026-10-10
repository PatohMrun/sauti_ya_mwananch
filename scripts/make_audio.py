"""Synthesises the ad's original soundtrack and sound effects into public/audio.

Everything is generated from scratch with numpy, so it is royalty-free.
Run: python3 scripts/make_audio.py
"""
import wave
from pathlib import Path

import numpy as np

SR = 44100
OUT = Path(__file__).resolve().parent.parent / "public" / "audio"
rng = np.random.default_rng(7)


def write(name, stereo):
    stereo = np.clip(stereo, -1, 1)
    data = (stereo * 32767).astype("<i2")
    with wave.open(str(OUT / name), "wb") as w:
        w.setnchannels(2)
        w.setsampwidth(2)
        w.setframerate(SR)
        w.writeframes(data.tobytes())


def t_axis(seconds):
    return np.arange(int(seconds * SR)) / SR


def hz(midi):
    return 440.0 * 2 ** ((midi - 69) / 12)


def lowpass(x, alpha):
    # One-pole low-pass filter; alpha in (0, 1], smaller = darker.
    y = np.empty_like(x)
    acc = 0.0
    for i, v in enumerate(x):
        acc += alpha * (v - acc)
        y[i] = acc
    return y


def music(duration=17.2, bpm=120):
    n = int(duration * SR)
    left = np.zeros(n)
    right = np.zeros(n)
    beat = 60 / bpm
    bar = beat * 4
    # I - V - vi - IV in C major (root, third, fifth as MIDI notes).
    chords = [[60, 64, 67], [55, 59, 62], [57, 60, 64], [53, 57, 60]]
    drums_in = 1.97  # greeting scene
    drop = 9.4  # date scene: bigger groove

    def add(sig, start, pan=0.0, gain=1.0):
        i = int(start * SR)
        if i >= n:
            return
        sig = sig[: n - i] * gain
        left[i : i + len(sig)] += sig * (1 - pan) / 2 * 2 ** 0.5
        right[i : i + len(sig)] += sig * (1 + pan) / 2 * 2 ** 0.5

    bars = int(np.ceil(duration / bar))
    for b in range(bars):
        chord = chords[b % 4]
        start = b * bar
        # Warm pad: detuned stacked sines with soft attack/release.
        t = t_axis(bar + 0.3)
        env = np.minimum(1, t / 0.35) * np.minimum(1, (bar + 0.3 - t) / 0.4)
        for note in chord:
            f = hz(note)
            for det, pan in ((-0.004, -0.6), (0.004, 0.6)):
                ff = f * (1 + det)
                tone = np.sin(2 * np.pi * ff * t) + 0.3 * np.sin(4 * np.pi * ff * t) + 0.1 * np.sin(6 * np.pi * ff * t)
                add(tone * env, start, pan, 0.035)
        # Bass on the root.
        tb = t_axis(bar)
        f = hz(chord[0] - 24)
        bass = np.sin(2 * np.pi * f * tb) * np.exp(-tb * 1.2) * np.minimum(1, tb / 0.01)
        add(bass, start, 0, 0.22 if start >= drums_in else 0.1)
        # Pluck arpeggio in eighth notes.
        pattern = [0, 1, 2, 1, 0, 2, 1, 2]
        for k in range(8):
            note = chord[pattern[k]] + 12 + (12 if k in (2, 5) else 0)
            tp = t_axis(0.5)
            f = hz(note)
            pl = (np.sin(2 * np.pi * f * tp) + 0.25 * np.sin(4 * np.pi * f * tp)) * np.exp(-tp * 9)
            add(pl, start + k * beat / 2, 0.35 if k % 2 else -0.35, 0.07)

    # Drums.
    t_end = duration
    k = 0
    while k * beat < t_end:
        time = k * beat
        if time >= drums_in:
            tk = t_axis(0.35)
            sweep = 50 + 90 * np.exp(-tk * 30)
            kick = np.sin(2 * np.pi * np.cumsum(sweep) / SR) * np.exp(-tk * 9)
            if k % 2 == 0 or time >= drop:
                add(kick, time, 0, 0.5)
            if k % 2 == 1:
                tc = t_axis(0.2)
                clap = lowpass(rng.standard_normal(len(tc)), 0.5) * np.exp(-tc * 25)
                add(clap, time, 0.1, 0.18)
            th = t_axis(0.06)
            hat = (rng.standard_normal(len(th)) - lowpass(rng.standard_normal(len(th)), 0.2)) * np.exp(-th * 70)
            add(hat, time + beat / 2, -0.3, 0.06 if time < drop else 0.09)
        k += 1

    # Fade in/out.
    t = np.arange(n) / SR
    fade = np.minimum(1, t / 0.6) * np.clip((duration - t) / 1.6, 0, 1)
    mix = np.stack([left * fade, right * fade], axis=1)
    return mix / np.max(np.abs(mix)) * 0.8


def whoosh(seconds=0.5):
    t = t_axis(seconds)
    noise = rng.standard_normal(len(t))
    env = np.sin(np.pi * t / seconds) ** 2
    # Sweep the filter brightness up and down.
    out = np.empty_like(noise)
    acc = 0.0
    for i, v in enumerate(noise):
        a = 0.08 + 0.5 * env[i]
        acc += a * (v - acc)
        out[i] = acc
    out *= env
    pan = np.linspace(-0.8, 0.8, len(t))
    st = np.stack([out * (1 - pan) / 2, out * (1 + pan) / 2], axis=1)
    return st / np.max(np.abs(st)) * 0.6


def pop():
    t = t_axis(0.25)
    t = t_axis(0.12)
    f = 900 + 900 * np.exp(-t * 60)
    s = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 45)
    return np.stack([s, s], axis=1) * 0.6


def impact():
    t = t_axis(0.8)
    f = 90 + 90 * np.exp(-t * 25)
    thud = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 14)
    noise = rng.standard_normal(len(t))
    shimmer = (noise - lowpass(noise, 0.3)) * np.exp(-t * 6) * 0.25
    s = thud + shimmer
    return np.stack([s, s], axis=1) / np.max(np.abs(s)) * 0.8


def chime():
    t = t_axis(1.2)
    s = np.zeros(len(t))
    for i, note in enumerate([84, 88, 91]):
        d = int(i * 0.07 * SR)
        f = hz(note)
        tt = t[: len(t) - d]
        s[d:] += (np.sin(2 * np.pi * f * tt) + 0.2 * np.sin(6 * np.pi * f * tt)) * np.exp(-tt * 4)
    return np.stack([s, s], axis=1) / np.max(np.abs(s)) * 0.45


if __name__ == "__main__":
    OUT.mkdir(parents=True, exist_ok=True)
    write("music.wav", music())
    write("whoosh.wav", whoosh())
    write("pop.wav", pop())
    write("impact.wav", impact())
    write("chime.wav", chime())
    print("wrote", sorted(p.name for p in OUT.iterdir()))
