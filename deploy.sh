#!/bin/bash

# Deployment Script for Pedi And Mani Home Salon Website
# This script helps deploy the website to GitHub Pages

echo "🌸 Pedi And Mani Home Salon - Deployment Script 🌸"
echo "=================================================="

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "📦 Initializing Git repository..."
    git init
    git add .
    git commit -m "Initial commit - Pedi And Mani Home Salon Website"
else
    echo "✅ Git repository already exists"
fi

# Check if remote is configured
if ! git remote get-url origin > /dev/null 2>&1; then
    echo "⚠️  No remote repository found."
    echo "Please create a GitHub repository and run:"
    echo "git remote add origin <your-github-repo-url>"
    echo "git push -u origin main"
    exit 1
else
    echo "✅ Remote repository configured"
fi

# Add all changes
echo "📝 Adding changes to Git..."
git add .

# Commit changes
echo "💾 Committing changes..."
git commit -m "Update website - $(date '+%Y-%m-%d %H:%M:%S')"

# Push to GitHub
echo "🚀 Pushing to GitHub..."
git push origin main

echo ""
echo "✅ Deployment completed!"
echo ""
echo "📋 Next Steps:"
echo "1. Go to your GitHub repository"
echo "2. Navigate to Settings > Pages"
echo "3. Select source as 'Deploy from a branch'"
echo "4. Choose 'main' branch and '/ (root)' folder"
echo "5. Click 'Save' and wait for deployment"
echo ""
echo "🌐 Your website will be available at:"
echo "https://<your-username>.github.io/<your-repository-name>"
echo ""
echo "🎉 Thank you for choosing Pedi And Mani Home Salon! 💖"
