#!/bin/bash
set -e

echo "================================"
echo "VPS Initialization Script"
echo "================================"

# Update system
echo "Updating system packages..."
sudo apt update
sudo apt upgrade -y

# Install required packages
echo "Installing required packages..."
sudo apt install -y python3 python3-pip python3-venv nginx git certbot python3-certbot-nginx ufw

# Configure firewall
echo "Configuring firewall..."
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw --force enable
sudo ufw logging off

# Create GitHub deploy key (optional but recommended)
echo ""
echo "================================"
echo "GitHub Deploy Key Setup"
echo "================================"
echo "Do you want to create an SSH key for GitHub? (y/n)"
read -r create_key

if [ "$create_key" = "y" ]; then
    if [ ! -f ~/.ssh/id_rsa ]; then
        ssh-keygen -t rsa -b 4096 -C "deploy@trackisolator.com" -f ~/.ssh/id_rsa -N ""
        echo ""
        echo "SSH public key created. Add this to your GitHub repository's Deploy Keys:"
        echo "https://github.com/narevent/schizoid-lloyd/settings/keys"
        echo ""
        cat ~/.ssh/id_rsa.pub
        echo ""
        echo "Press Enter after adding the key to GitHub..."
        read -r
    else
        echo "SSH key already exists at ~/.ssh/id_rsa"
    fi
fi

echo ""
echo "================================"
echo "VPS Initialization Complete!"
echo "================================"
echo ""
echo "Next steps:"
echo "1. Run the deploy script: bash scripts/deploy.sh"
echo ""