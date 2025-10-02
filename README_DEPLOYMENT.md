# 🤖 Automated User Research Dashboard

**Live Deployment**: [littlehelper.vercel.app](https://littlehelper.vercel.app)

An AI-powered automated user research platform that generates realistic personas, conducts interviews, and produces comprehensive research reports using Anthropic Claude.

## 🌟 **Live Features**

✅ **AI-Powered Persona Generation** - Create realistic user personas aligned to your target audience  
✅ **Automated Interview Conduction** - AI generates 10-15 relevant Q&A pairs per persona  
✅ **Comprehensive Report Generation** - Professional insights with friction points & highlights  
✅ **PDF Export** - Download formatted research reports  
✅ **Modern Dark UI** - Beautiful ShadCN components with Tailwind CSS  
✅ **Database Persistence** - All research data saved and manageable  

## 🚀 **Quick Start**

### **1. Create Research Project**
Fill out the form with:
- Research title and product type  
- Research goal and target audience  
- Number of personas (1-12)

### **2. Generate AI Research**
Click "Generate" to:
- Create realistic user personas
- Conduct structured interviews  
- Synthesize comprehensive reports

### **3. Review & Export**
- Browse generated personas and interview transcripts
- Review AI insights and recommendations
- Export professional PDF reports

## 🔧 **Technical Stack**

- **Frontend**: Next.js 14 with App Router
- **UI**: ShadCN/UI components with dark theme
- **Database**: Prisma with Postgres/SQLite  
- **AI**: Anthropic Claude 3.5 Sonnet
- **Validation**: Zod schemas throughout
- **Deployment**: Vercel with automatic CI/CD

## 📊 **Research Workflow**

```
Input Form → AI Generation → Database Storage → Results Display → PDF Export
```

1. **User inputs** research parameters
2. **AI generates** personas and interview questions  
3. **System conducts** simulated interviews
4. **AI synthesizes** comprehensive reports
5. **User exports** professional PDF deliverables

## 🎯 **API Endpoints**

- `POST /api/projects` - Create new research project
- `GET /api/projects` - List all projects
- `POST /api/projects/[id]/personas` - Generate AI research data
- `GET /api/projects/[id]/report` - Get research report
- `GET /api/projects/[id]/report.pdf` - Download PDF report
- `DELETE /api/projects/[id]` - Delete project (soft/hard)

## 🔑 **Environment Setup**

Required environment variables:
```bash
ANTHROPIC_API_KEY=your_anthropic_api_key
DATABASE_URL=postgres://user:pass@host/db
```

## 📱 **Responsive Design**

- **Desktop**: Full-featured dashboard with sidebar navigation
- **Mobile**: Optimized touch-friendly interface  
- **Dark Theme**: Professional slate color scheme
- **Accessibility**: Screen reader compatible

## 🛡️ **Data Management**

- **Soft Delete**: Projects marked as archived
- **Hard Delete**: Complete data removal with cascading
- **Data Validation**: Zod schemas ensure data integrity
- **Error Handling**: Comprehensive error handling with retries

## 🔄 **Development**

### **Local Setup**
```bash
git clone https://github.com/maybepepx/littlehelper.git
cd littlehelper
npm install
npm run db:push
npm run dev
```

### **Environment Variables**
```bash
cp env.example .env.local
# Add your ANTHROPIC_API_KEY
```

### **Database Commands**
```bash
npm run db:push      # Push schema changes
npm run db:generate  # Generate Prisma client
npm run db:seed      # Add sample data
```

## 📈 **Production Ready**

✅ **Build Optimization**: Turbopack for fast builds  
✅ **Error Boundaries**: Graceful error handling  
✅ **Type Safety**: Full TypeScript coverage  
✅ **Performance**: Optimized images and fonts  
✅ **SEO**: Next.js metadata and Open Graph tags  
✅ **Analytics**: Ready for Vercel Analytics  

## 🌐 **Deployment**

Deployed automatically via:
- **GitHub Integration**: Pushes trigger live deployments
- **Vercel Platform**: Serverless functions with edge caching
- **Database**: Vercel Postgres for production data
- **CDN**: Global content delivery for optimal performance

## 📞 **Support**

- **Repository**: [GitHub Issues](https://github.com/maybepepx/littlehelper/issues)
- **Documentation**: See VERCEL_DEPLOYMENT.md for setup guides
- **Demo**: [Live Application](https://littlehelper.vercel.app)

---

**🎯 Generate professional user research insights in minutes, not weeks!**

**🚀 Live at**: [littlehelper.vercel.app](https://littlehelper.vercel.app)
