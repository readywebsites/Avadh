# Mobile Accordion Timeline - Visual Design Guide

## 🎨 Visual Structure

### Desktop View (768px+)
```
┌─────────────────────────────────────────────────┐
│            TIMELINE HEADER                      │
│     Avadh Group Journey                         │
│    Building Dreams Since 2010                   │
└─────────────────────────────────────────────────┘

Year Tab Bar (Horizontal Scrollable):
[2026] [2025] [2024] [2022] [2021] [2019] ...

Content Area (Selected Year):
┌─────────────────────────────────────────────────┐
│ 2026  INTERNATIONAL EXPANSION                  │
│ ─────────────────────────────────────────────── │
│ Project: International Expansion                │
│ • Exploring international real estate...        │
│ • Partnerships with global developers...        │
│ Growth: Vision to become global player...      │
└─────────────────────────────────────────────────┘
```

### Mobile View (≤768px) - ACCORDION LAYOUT
```
┌──────────────────────────────────┐
│  AVADH GROUP JOURNEY             │
│  Building Dreams Since 2010      │
└──────────────────────────────────┘

┌──────────────────────────────────┐
│ 2026                          ▼  │  ← Click/Tap to Expand
│ Global Vision                    │
└──────────────────────────────────┘ (Collapsed)

┌──────────────────────────────────┐
│ 2025                          ▲  │  ← Open (Icon Rotated)
│ Expansion & Innovation           │
├──────────────────────────────────┤ ← Expands Smoothly
│ ▪ International Expansion        │
│ • Achieved 15 years excellence   │
│ • 5000+ happy homeowners         │
│                                  │
│ Growth Milestone:                │
│ • Achieved 15 years excellence   │
│ • 5000+ happy homeowners         │
└──────────────────────────────────┘

┌──────────────────────────────────┐
│ 2024                          ▼  │
│ Luxury Segment                   │
└──────────────────────────────────┘ (Collapsed)

┌──────────────────────────────────┐
│ 2022                          ▼  │
│ Landmark Township                │
└──────────────────────────────────┘

... (More accordion items)
```

---

## 🎯 Component Anatomy

### Accordion Header (Closed State)
```
┌─────────────────────────────────────────────┐
│  Year          Headline              Icon   │
│  ════════════════════════════════════       │
│  2026  Global Vision              ▼        │
│        (Text truncates if long)   [Gold]   │
└─────────────────────────────────────────────┘
  │
  └─ Gold glow on hover
  └─ Smooth background color shift
  └─ Subtle elevation increase
```

### Accordion Header (Open State)
```
┌─────────────────────────────────────────────┐
│  2026  Global Vision              ▲        │
│                                   [Gold]   │
├─────────────────────────────────────────────┤ ← Border separates
│  ▪ International Expansion                 │
│  • Exploring intl. real estate...          │
│  • Partnerships with global devs...        │
│  • Investment in sustainable tech...       │
│                                            │
│  Growth Milestone:                         │
│  • Vision to become global player         │
│                                            │
└─────────────────────────────────────────────┘
```

### Accordion Body Content
```
┌────────────────────────────────────┐
│  ▪ Project Name                    │ ← Gold bullet
├────────────────────────────────────┤
│ KEY ACHIEVEMENTS                   │ ← Section title (uppercase)
│ ────────────────────────────────── │
│ ◆ Achievement bullet point 1       │ ← Small diamond
│ ◆ Achievement bullet point 2       │
│ ◆ Achievement bullet point 3       │
│                                    │
│ GROWTH MILESTONE                   │
│ ────────────────────────────────── │
│ ◆ Growth milestone bullet 1        │
│ ◆ Growth milestone bullet 2        │
└────────────────────────────────────┘
```

---

## 🎨 Color Palette

### Primary Colors
```
Background:  #0f1419  (Dark Navy)      ███
             #1a1f3a  (Deep Blue)      ███
Primary:     #d4af37  (Gold)           ███
Accent:      #f4e4c1  (Light Gold)     ███
```

### Semantic Colors
```
Text:        #ffffff  (White)          ███ (Primary)
             #d0d0d0  (Light Gray)     ███ (Secondary)
             #b0b0b0  (Medium Gray)    ███ (Tertiary)
             #888888  (Dark Gray)      ███ (Muted)
Borders:     rgba(212, 175, 55, 0.15) (Subtle Gold)
```

### State Colors
```
Hover:       rgba(212, 175, 55, 0.15) (Background tint)
Active:      rgba(212, 175, 55, 0.25) (Darker tint)
Focus:       #d4af37 (Gold outline)
Error:       #ff6b6b (If needed)
```

---

## 📏 Typography Hierarchy

### Title (h1) - Header
```
AVADH GROUP JOURNEY
════════════════════════════════════
Font:      Montserrat 700
Size:      26px
Spacing:   -0.5px letter-spacing
Color:     #ffffff
Line:      1.2x
```

### Subtitle (p) - Tagline
```
Building Dreams Since 2010
════════════════════════════════════
Font:      Montserrat 500
Size:      13px
Spacing:   1px letter-spacing
Color:     #d4af37
Case:      UPPERCASE
Line:      1x
```

### Accordion Year
```
2026
════════════════════════════════════
Font:      Montserrat 700
Size:      16px
Spacing:   -0.3px letter-spacing
Color:     Gradient (#d4af37 → #f4e4c1)
Effect:    Background clip
Line:      1x
```

### Accordion Headline
```
Global Vision
════════════════════════════════════
Font:      Montserrat 600
Size:      12px
Color:     #b0b0b0
Case:      Capitalize
Line:      1.3x
Truncate:  1 line (ellipsis)
```

### Body Text
```
◆ Achievement text here...
════════════════════════════════════
Font:      Montserrat 400
Size:      12px
Color:     #d0d0d0
Line:      1.4x
Hover:     #ffffff
```

### Section Title
```
KEY ACHIEVEMENTS
════════════════════════════════════
Font:      Montserrat 700
Size:      11px
Spacing:   1.5px letter-spacing
Color:     #d4af37
Case:      UPPERCASE
Weight:    700
```

---

## 🎬 Animation Timeline

### Expand Animation (300ms)
```
Timeline:    ┌─────────────────────────────────┐
Time:        0ms    75ms   150ms  225ms  300ms
             │      │      │      │      │
             
Body:        ▁──────────────────────────────▀ (slides in)
             0      25%    50%    75%    100%

Opacity:     0%────────────────────────────100% (fades in)
             
Icon:        0°─────────────────────────────180° (rotates)

Background:  ┌────────────────────────────────┐ (subtle shift)
```

### Collapse Animation (300ms)
```
Timeline:    ┌─────────────────────────────────┐
Time:        0ms    75ms   150ms  225ms  300ms
             │      │      │      │      │
             
Body:        ▀──────────────────────────────▁ (slides out)
             100%   75%    50%    25%    0%

Opacity:     100%───────────────────────────0% (fades out)

Icon:        180°───────────────────────────0° (rotates back)

Background:  ┌────────────────────────────────┐ (reverts)
```

### Easing Curve
```
Easing:      cubic-bezier(0.4, 0, 0.2, 1)
Description: Fast start, smooth deceleration
             Perfect for natural motion
```

---

## 📐 Spacing System

### Vertical Rhythm
```
Timeline Section:
  40px padding-top
  
Header:
  28px margin-bottom
  
Accordion Items:
  8px gap between items
  
Header Button:
  16px padding (top/bottom)
  14px padding (left/right)
  
Toggle Icon:
  28px width × 28px height
  10px margin-left
  
Body Content:
  14px padding (left/right)
  20px padding-bottom
  
Sections:
  14px margin-bottom
  
Bullets:
  6px margin-bottom
```

### Horizontal Spacing
```
Container:     12px padding (left/right)
Accordion:     Full width
Content:       14px padding
Bullets:       16px left padding (with indent)
Icons:         Centered, 28×28px
```

---

## 🎯 Touch Targets

### Button Sizing
```
Minimum Size:   44px × 44px (iOS)
Recommended:    56px × 56px (Android)
Spacing Gap:    8px minimum between targets

Accordion Header: 56px height (meets AA compliance)
Toggle Button:    28px (encased in padded area)
Section Title:    Clickable through parent
```

---

## 🌈 State Indicators

### Hover State
```
Background:    rgba(212, 175, 55, 0.15)
Border:        rgba(212, 175, 55, 0.4)
Transform:     translateY(-2px) (lift effect)
Shadow:        0 8px 24px rgba(212, 175, 55, 0.1)
Duration:      0.3s cubic-bezier
```

### Active (Open) State
```
Background:    rgba(212, 175, 55, 0.25)
Border:        #d4af37
Icon:          180° rotation
Color:         #f4e4c1
Shadow:        0 0 12px rgba(212, 175, 55, 0.3)
```

### Focus State
```
Outline:       2px solid #d4af37
Offset:        2px
Keyboard:      Always visible
Accessibility: WCAG AA compliant
```

---

## 📱 Responsive Breakpoints

### 768px and Below
```
Full accordion layout active
Padding: 12-14px
Header: 56px height
Font sizes: 26px, 16px, 12px
Gap: 8px between items
```

### 480px and Below
```
Reduced padding: 10px
Header: 52px height
Font sizes: 22px, 15px, 11px
Gap: 6px between items
Further optimized spacing
```

### Landscape Mode
```
Header: 48px height (compact)
Font: Slightly reduced
Padding: 12px overall
Still maintains 44px touch targets
```

---

## ✨ Visual Effects

### Gradient Text (Year)
```
Gradient:  135deg, #d4af37 0%, #f4e4c1 100%
Clip:      Background clip with webkit prefix
Result:    Smooth gold-to-light-gold gradient text
```

### Backdrop Filter (Glass)
```
Effect:    blur(10px)
On:        Body background, section backgrounds
Intensity: Creates frosted glass effect
Browser:   Modern browsers (fallback: solid color)
```

### Box Shadow
```
Hover:     0 8px 24px rgba(212, 175, 55, 0.1)
Active:    0 0 12px rgba(212, 175, 55, 0.3)
Purpose:   Elevation and prominence feedback
```

---

## 🎬 Visual Demo

### Interaction Flow
```
1. Page Load (≤768px)
   ↓
   ┌──────────────────────────┐
   │ Timeline header renders  │
   │ Accordion items created  │
   │ Default year (2022) open │
   └──────────────────────────┘
   
2. User Taps Card Header
   ↓
   ┌──────────────────────────┐
   │ Header highlights        │
   │ Icon rotates 180°        │
   │ Body slides down smooth  │
   │ Content fades in         │
   └──────────────────────────┘
   
3. Content Visible
   ↓
   ┌──────────────────────────┐
   │ Full accordion expanded  │
   │ Bullets visible          │
   │ Premium styling applied  │
   │ User reads content       │
   └──────────────────────────┘
   
4. User Taps Again
   ↓
   ┌──────────────────────────┐
   │ Icon rotates back 0°     │
   │ Body slides up smooth    │
   │ Content fades out        │
   │ Collapsed to header only │
   └──────────────────────────┘
```

---

## 🎨 Customization Examples

### Change Theme Color (from Gold to Teal)
```
#d4af37 → #00d9ff (Teal)
#f4e4c1 → #80f5ff (Light Teal)
rgba(212, 175, 55, ...) → rgba(0, 217, 255, ...)
```

### Increase Animation Speed
```
0.3s → 0.2s (faster)
0.3s → 0.5s (slower)
Perfect for preference testing
```

### Larger Font for Accessibility
```
26px h1 → 28px
16px year → 18px
12px content → 13px
Still responsive at small sizes
```

---

## ✅ Quality Checklist

- [x] Smooth animations (60fps)
- [x] Touch-friendly sizing (44px+)
- [x] Premium dark theme
- [x] Gold accent color scheme
- [x] Zero horizontal overflow
- [x] Readable typography hierarchy
- [x] Proper contrast ratios
- [x] Keyboard accessible
- [x] Screen reader compatible
- [x] Fast initial load
- [x] No janky transitions
- [x] Professional appearance

---

**Design Version**: 1.0  
**Last Updated**: January 15, 2026  
**Status**: ✅ Ready for Production
