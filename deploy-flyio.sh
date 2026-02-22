#!/bin/bash

###############################################################################
# THE ARENA - Fly.io Deployment Script
# Deploy backend to Fly.io with one command
###############################################################################

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

print_header() {
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${BLUE}$1${NC}"
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
}

print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ $1${NC}"
}

###############################################################################
# Main
###############################################################################

main() {
    clear
    
    echo -e "${BLUE}"
    echo "╔════════════════════════════════════════════════════════════════╗"
    echo "║        THE ARENA - Fly.io Deployment                          ║"
    echo "║                  Backend Production Deployment                ║"
    echo "╚════════════════════════════════════════════════════════════════╝"
    echo -e "${NC}"
    echo ""
    
    print_header "Step 1: Verifying Prerequisites"
    
    if ! command -v flyctl &> /dev/null; then
        print_info "Installing Fly CLI..."
        curl -L https://fly.io/install.sh | sh
        export PATH="$HOME/.fly/bin:$PATH"
    fi
    print_success "Fly CLI installed"
    
    echo ""
    print_header "Step 2: Authenticate with Fly.io"
    
    print_info "Logging in to Fly.io..."
    flyctl auth login
    
    echo ""
    print_header "Step 3: Deploy to Fly.io"
    
    cd /home/ubuntu/the-arena-website/backend
    
    print_info "Launching app on Fly.io..."
    flyctl launch --name the-arena-api --region sjc
    
    echo ""
    print_info "Setting environment secrets..."
    
    read -sp "Gemini API Key: " GEMINI_KEY
    echo ""
    read -sp "OpenAI API Key: " OPENAI_KEY
    echo ""
    read -sp "Anthropic API Key: " ANTHROPIC_KEY
    echo ""
    read -sp "xAI API Key: " XAI_KEY
    echo ""
    read -sp "Twitter Bearer Token: " TWITTER_TOKEN
    echo ""
    read -sp "Substack API Key: " SUBSTACK_KEY
    echo ""
    read -sp "SendGrid API Key: " SENDGRID_KEY
    echo ""
    
    flyctl secrets set \
        GEMINI_API_KEY="$GEMINI_KEY" \
        OPENAI_API_KEY="$OPENAI_KEY" \
        ANTHROPIC_API_KEY="$ANTHROPIC_KEY" \
        XAI_API_KEY="$XAI_KEY" \
        TWITTER_BEARER_TOKEN="$TWITTER_TOKEN" \
        SUBSTACK_API_KEY="$SUBSTACK_KEY" \
        SENDGRID_API_KEY="$SENDGRID_KEY"
    
    echo ""
    print_info "Deploying to Fly.io..."
    flyctl deploy
    
    echo ""
    print_header "Step 4: Deployment Complete!"
    
    echo -e "${GREEN}🎉 Backend deployed to Fly.io!${NC}"
    echo ""
    echo "Your API is now live at:"
    echo "https://the-arena-api.fly.dev"
    echo ""
    
    print_success "Deployment complete"
}

main
