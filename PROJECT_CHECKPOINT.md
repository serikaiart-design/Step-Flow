# Step-Flow by SK AI Art — Project Checkpoint

**Saved:** 25 August 2026  
**Owner:** Serik  
**Public contact:** serik.ai.art@gmail.com  
**Production:** https://serikaiart-design.github.io/Step-Flow/  
**Repository:** https://github.com/serikaiart-design/Step-Flow

## Current identity

- Brand: **Step-Flow by SK AI Art**
- Tagline: **Простые решения, шаг за шагом.**
- Audience: ordinary computer users who need understandable step-by-step guidance.
- Public About section contains Serik's personal introduction and an honest professional-experience disclaimer.

## Saved functionality

- Responsive desktop, tablet, and mobile layout.
- Problem guides, program recommendations, FAQ, terms, privacy section, and About section.
- Private feedback form sends responses through Google Apps Script to a closed Google Sheet.
- Feedback is not published publicly.
- Consent checkbox, honeypot, 30-second client cooldown, length validation, and basic spreadsheet-formula sanitization are enabled in the website form.
- Public contact uses serik.ai.art@gmail.com.

## Legal and safety state

- Independent-project and third-party trademark disclaimer added.
- Personal-data notice describes feedback fields, purpose, Google processing, GitHub Pages logs, deletion requests, and a planned 90-day retention period.
- Browser referrer policy and Content Security Policy are present.
- PotPlayer link points to potplayer.tv.
- Remote Google favicon requests were removed from the main page.
- This repository includes proprietary rights and vulnerability-reporting notices.

## External owner-controlled services

- GitHub Pages hosts the public website.
- Google Apps Script receives private feedback.
- A private Google Sheet stores feedback; access remains controlled by the owner.
- GitHub Insights → Traffic shows repository statistics for the most recent 14 days.

## Important remaining owner action

The Google Apps Script deployment should eventually be updated with server-side validation, rate limiting, and spreadsheet-formula sanitization. Website-side controls reduce accidental abuse but cannot protect a public endpoint by themselves.

## Recovery

The latest production checkpoint begins with commit **057620c1ba958d9fc70601314f1f74f988c9841d** and the documentation commits that follow it. Git history preserves earlier working versions and allows rollback without deleting the project.
