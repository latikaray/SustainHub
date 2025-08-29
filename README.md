<p align="center">
  <img src="https://github.com/user-attachments/assets/32578c72-aa99-4309-878c-a848641d679b" alt="SustainHub Logo" width="120"/>
</p>

# SustainHub

**SustainHub** is an AI-powered SaaS platform designed to enhance waste management and sustainability credibility for industries. It recommends the most suitable waste buyers, helps track environmental impact, and increases transparency by assigning a **Green Score** to organizations based on their waste handling.  

🚀 SustainHub is live! Explore it now at 👉 [https://sustain-hub.netlify.app](https://sustain-hub.netlify.app)

[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/) 
[![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Netlify](https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)](https://www.netlify.com/)

---

## Table of Contents
- [Overview](#Overview)
- [Features](#Features)
- [Tech Stack](#Tech-Stack)
- [⚡ AI / Heuristic Methods in SustainHub](#AI-Heuristic-Methods-in-SustainHub)

---

## Overview
SustainHub addresses the problem of **inefficient waste management and lack of transparency** in the recycling industry.  

Key benefits:  
- Provides **potential buyer recommendations** for waste disposal.  
- Assigns a **Green Score** to companies, increasing credibility and sustainability tracking.  
- Helps industries optimize trading decisions and demonstrate ESG compliance.  

Future scope: Image classification for automated waste categorization.  

---

## Features
- AI-powered recommendation system for buyers.  
- Environmental impact scoring (Green Score).  
- Real-time data and serverless backend with Supabase.  
- Clean, responsive UI built with React + TailwindCSS.  

---

## Tech Stack
| Layer | Technology | Purpose |
|-------|------------|---------|
| Frontend | React + TypeScript | Interactive UI & type safety |
| Styling | TailwindCSS | Utility-first CSS framework |
| Build Tool | Vite | Fast development and bundling |
| Backend | Supabase | Database, Auth, serverless functions |
| AI / Heuristics | Rule-based Expert Systems | Recommendation & impact scoring |
| Version Control | Git + GitHub | Source code management |

---

## AI Heuristic Methods in SustainHub

SustainHub employs applied AI techniques and heuristic approaches to provide intelligent recommendations and sustainability insights. These methods are lightweight, interpretable, and efficient for industry applications. The following systems are implemented:

### 1. Rule-based Heuristic System
Fixed rules and multipliers are defined for parameters such as **waste volume, plan type, and waste type**.  

**Example:**  
- `wasteVolume = "50-100"` → 75 kg baseline  
- `pricingPlan = "premium"` → 2.2x multiplier  

This approach represents a classic **expert system** in AI, where domain knowledge is encoded into rules.  

---

### 2. Weighted Scoring Algorithm (Multi-Criteria Decision Making)
For each buyer, a **match score** is calculated based on weighted criteria:  
- Location Score → 30%  
- Price Score → 40%  
- Reliability Score → 30%  

This constitutes a **Multi-Criteria Decision Making (MCDM)** system, a commonly used method in recommender systems.  

---

### 3. Recommendation System Logic (Top-N Selection)
The scoring system identifies the **top 3 buyers** as recommendations.  
This process—**filter → rank → select**—forms the core of recommendation engines.  

**Predictive Estimation (Heuristic Forecasting)**
- Simulates current vs. potential trade values using multipliers and averages.  
- Generates **growth projections (% annually)** within realistic bounds using heuristic randomization.  

---

### 4. Environmental Impact Scoring (Expert System + Thresholds)
SustainHub also evaluates **environmental impact** by assigning a **Green Score** based on:  
- Base score (60)  
- Waste volume multiplier  
- Plan multiplier  
- Waste type bonus  

Impact levels are classified into categories such as **“Revolutionary”** or **“Exceptional.”**  
This represents a **rule-based classification system**, a lightweight yet effective AI method.

---

### Conclusion
SustainHub bridges the gap between industries and sustainable waste management by providing intelligent buyer recommendations and transparent impact scoring. By simplifying decision-making and introducing the Green Score, it empowers organizations to improve their sustainability credibility and align with ESG goals.  

Future enhancements, such as AI-driven waste classification and advanced analytics, will further strengthen the platform’s value.  
We welcome contributions, feedback, and collaboration to make SustainHub a leading solution in sustainable innovation.
