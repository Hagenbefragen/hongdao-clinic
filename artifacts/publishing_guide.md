# Publishing Guide: HongDao TCM Clinic Website

This guide outlines the most straightforward, cost-effective, and highest-performing methods to host your new HTML/CSS/JS website on the internet using your existing domain (`hongdao-tcm.clinic`).

---

## Why Move Away From Wix Hosting?
Wix is a great drag-and-drop tool, but it does not support uploading raw, custom-coded HTML, CSS, and JavaScript files directly as a complete website. 

Instead of paying Wix for hosting, you can host your new custom website **for free** on a modern developer-friendly CDN platform, while keeping your domain registration. This will make your website load significantly faster (nearly 100% Google PageSpeed score) and cost you €0/month in hosting fees.

---

## Top 3 Free Hosting Alternatives

### Option A: Netlify (Easiest / Drag & Drop)
Netlify allows you to publish websites by dragging and dropping a folder from your desktop, or connecting a Git repository.

1. **Sign Up:** Create a free account at [Netlify.com](https://www.netlify.com/).
2. **Deploy:** 
   - Go to your Netlify dashboard.
   - Drag and drop the `Nanjing` folder (containing your `index.html`, `style.css`, `app.js`, `server.js`, and `images/` directory) into the deploy box.
   - Your website is instantly live on a temporary URL (e.g., `https://relaxing-mountain-123.netlify.app`).
3. **Add Custom Domain:** Go to "Domain settings", click "Add custom domain", and enter `hongdao-tcm.clinic`.

### Option B: Vercel (Recommended for Speed & Git integration)
Vercel is a premium cloud platform optimized for performance and automatic builds.

1. **Sign Up:** Go to [Vercel.com](https://vercel.com/) and sign up for a free Hobby account.
2. **Deploy:** 
   - Connect your GitHub account.
   - Select the repository containing your website.
   - Click "Deploy". Every time you push changes to GitHub, Vercel updates the site automatically.
3. **Add Custom Domain:** Under your project settings, go to "Domains" and add `hongdao-tcm.clinic`.

### Option C: GitHub Pages (Direct from repository)
If you already track your project on GitHub, GitHub Pages can host it directly.

1. Create a repository on GitHub.
2. Push your code.
3. Go to Repository **Settings > Pages**.
4. Set the build source to the `main` branch and folder `/` (root), then click Save.
5. In "Custom Domain", enter `hongdao-tcm.clinic`.

---

## How to Connect Your Domain (`hongdao-tcm.clinic`)

Since your domain is already registered, you do **not** need to buy a new one. You only need to configure the DNS settings so that it points to your new host instead of Wix.

### Step 1: Find DNS Settings in Wix
If you bought the domain through Wix, or point your nameservers to Wix:
1. Log in to your Wix account.
2. Go to the **Domains** page (under Subscriptions / Settings).
3. Click the three dots icon next to `hongdao-tcm.clinic` and select **Manage DNS Records**.

### Step 2: Configure CNAME & A Records
Delete or edit the existing records pointing to Wix, and replace them with the records provided by your new host (Netlify or Vercel).

#### If using Vercel:
* **A Record:** Point the root domain `@` or `hongdao-tcm.clinic` to:
  `76.76.21.21`
* **CNAME Record:** Point the `www` subdomain to:
  `cname.vercel-dns.com`

#### If using Netlify:
* **A Record:** Point the root domain `@` or `hongdao-tcm.clinic` to:
  `75.2.60.5`
* **CNAME Record:** Point the `www` subdomain to:
  `your-site-name.netlify.app`

### Step 3: Wait for Propagation
DNS changes take anywhere from 10 minutes to a few hours to propagate worldwide. Once propagated, Vercel or Netlify will automatically generate a **free SSL/HTTPS security certificate** for your domain, and the site will be fully live.
