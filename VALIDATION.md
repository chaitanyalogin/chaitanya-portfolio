# Verification record

Updated 12 October 2026.

## Verified

* Next.js 16.4.0 and React 19.3.0 installed from the npm registry and locked in package-lock.json.
* Next.js production compilation and static export.
* Twenty one Node tests covering contact encoding, sample correction/reset, media IDs, geometry, GPU buffer sizes and indices, matrix correctness, one draw per frame, no per frame geometry uploads, immediate content policy, internal links, downloads and security policy.
* Contact and resume assets preserved.
* Static export CSP hashes generated for the actual inline bootstrap scripts.

## Performance changes

The previous renderer sorted 1,568 polygons and submitted 3,136 Canvas path operations each frame. The replacement uploads geometry once, uses GPU projection and lighting, and issues one indexed draw per ordinary frame. JavaScript no longer performs per vertex projection, polygon sorting or per face color construction during animation.

Slow reveal transitions and continuous backdrop blur layers are removed. Scroll navigation uses cached section positions; decorative loops pause outside the viewport. The 3D scene pauses when offscreen or in a hidden tab and reduces render resolution when sustained frame intervals are high.

These are architecture and code measurements. They are not a measured device FPS, Lighthouse score or browser rendering benchmark.

## Review still needed

The supported browser QA capability is unavailable in this environment. WebGL shader compilation, page rendering, media playback, keyboard focus and sustained frame rates still need verification in an actual desktop and phone browser before publication. Mock GPU tests verify command behavior and matrix contracts, not real hardware execution.

The Windows launcher was not run on Windows. Its supplied preview server serves the optimized export and is intended for local review.

## Hosting

No Cloudflare, Vercel or Sites deployment was initiated for this portfolio. GitHub push remains pending creation of the dedicated repository selected by the user.

## Homepage preview fix

Corrected a directory boundary check that rejected the public root itself and produced HTTP 403. Regression checks cover Windows and POSIX trailing separators, actual homepage GET and HEAD responses, Next.js script loading, PDF responses, traversal rejection and the custom 404. The handler is tested without starting a browser or listening server.
