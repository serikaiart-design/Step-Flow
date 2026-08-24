# Step & Flow — DECISIONS

Updated: 2026-08-25

## Product decisions

1. The site is for non-technical Windows users and must use plain language.
2. Troubleshooting should proceed one safe step at a time.
3. The assistant should not behave like a generic chatbot when a known local scenario exists.
4. The top search field is a smart start: exact/common problems route directly to scenarios; complex/unknown requests go to the Assistant.
5. The Assistant button is green and visually unobtrusive.
6. Recommended programs, Windows, and System components are collapsible sections.
7. A Back action is required in troubleshooting flows.

## Assistant decisions

1. Local rules/knowledge first, AI wrapper second.
2. If the Assistant is stuck or confidence is low, escalate to the ChatGPT wrapper rather than guessing.
3. Understand colloquial Russian, typos, Windows terminology, program names, devices and error codes.
4. Preserve context of previous answers and actions during a case.
5. Distinguish symptom, evidence, probable cause and confirmed cause.
6. For ambiguous input, ask one precise clarifying question rather than starting a random scenario.

## Image / OCR decisions

1. Users should be able to attach a photo or screenshot of an error.
2. Do not expose a Vision API key in GitHub Pages JavaScript.
3. Image selection and preview are allowed locally in the browser before any server upload exists.
4. Future image analysis must use a protected backend/serverless endpoint.
5. Error codes detected from OCR must be confirmed if confidence is not high.
6. Do not request or process screenshots containing passwords, BitLocker recovery keys, product keys, banking information or other confidential data.

## Diagnostic decisions

1. BSOD codes are evidence, not a complete diagnosis.
2. Use Microsoft Bug Check documentation as an authority for stop-code meaning.
3. Recurring or unclear BSOD cases may advance to crash-dump/WinDbg analysis.
4. Common Windows error codes should be translated into ordinary language with a safe first step.
5. Registry cleaners are not a universal performance fix; diagnosis comes first.
6. BIOS/firmware changes and destructive disk actions are not first-line troubleshooting steps.

## Content / program decisions

Recommended tools currently discussed/used include Chrome, 7-Zip, PotPlayer, Adobe Acrobat Reader, Microsoft 365/Office, NCALayer, AIDA64, CrystalDiskInfo, Snappy Driver Installer, Wise Disk Cleaner, Wise Registry Cleaner and Geek Uninstaller.

System components include items such as DirectX Runtime, Visual C++ Redistributables, Microsoft Edge WebView2 Runtime, Java Runtime where needed, .NET Framework and legacy DirectX June 2010 redistributable when software specifically requires it.

Windows 11 is the default recommendation for modern compatible PCs. Windows 10 Enterprise LTSC 2021 is treated only as a special/legacy scenario with licensing and support caveats, not as a universal recommendation.

## Legal decisions

1. Rules/conditions must describe Step & Flow as an informational troubleshooting service, not guarantee a repair result.
2. Privacy rules become especially important before real image upload/Vision processing is enabled.
3. Verified owner/operator and contact details must be added before a formal commercial/legal launch in Kazakhstan.
4. Never fabricate legal identity information.