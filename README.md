# MyShop – Tillgänglighet & LCP-optimering

Detta projekt är en skoluppgift där jag har förbättrat en befintlig produktlista-sida med fokus på:

- ♿ Tillgänglighet (WCAG)
- ⚡ Prestanda, särskilt **Largest Contentful Paint (LCP)**
- 🧪 Testning med **axe**
- 📊 Mätning före och efter optimeringar

Projektet består av:
- `index.html`
- `styles.css`
- `script.js`
- `images/`

Inga nya filer har lagts till, endast befintliga filer har ändrats.

---

## ▶️ Köra projektet lokalt

Rekommenderat sätt:

- Öppna mappen i VS Code  
- Högerklicka på `index.html`  
- Välj **Open with Live Server**

---

## ♿ Tillgänglighetsförbättringar

Exempel på förbättringar som har gjorts:

- Lagt till semantiska HTML-element (`header`, `nav`, `main`, `footer`, `section`)
- Fixat korrekt rubrikhierarki (en `h1`, sedan `h2`, `h3`, osv)
- Lagt till `label` till alla formulärfält
- Bytt klickbara `div`-element till riktiga `button`-element
- Lagt till `alt`-texter på alla bilder
- Förbättrat fokusmarkering för tangentbordsnavigering
- Förbättrat kontrast enligt WCAG
- Lagt till “Skip to content”-länk

Tillgängligheten har verifierats med **axe**, och antalet fel har minskat jämfört med originalversionen.

---

## ⚡ Prestanda & LCP

Fokus har varit på att förbättra **Largest Contentful Paint (LCP)**, som är hero-bilden högst upp på sidan.

Åtgärder som har gjorts:

- Optimerat och komprimerat bilder (samma filnamn, mindre storlek)
- Satt `width` och `height` på bilder för att undvika layout shifts
- Använt `loading="lazy"` på bilder under folden
- Preload + hög prioritet på LCP-bilden
- Lagt `defer` på JavaScript för att undvika blockering av rendering
- Flyttat “tungt arbete” i JS så det inte stör första renderingen

LCP mäts:
- Via Chrome DevTools  
- Via `PerformanceObserver` i JavaScript (visas i sidans footer)

---

## 🧪 Testning med axe

axe körs via CDN.

För att köra test:

1. Öppna sidan med: index.html?axe=1

2. Öppna DevTools → Console  
3. Se resultatet från axe (violations, m.m.)

---

## 📝 Git

Arbetet är uppdelat i **små, atomära commits** som visar:

- Bugfixar  
- Tillgänglighetsförbättringar  
- Prestandaoptimeringar  
- Test- och mätkod (axe + LCP)