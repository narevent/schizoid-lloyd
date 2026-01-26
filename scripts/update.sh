#!/bin/bash
set -e

echo "================================"
echo "Django Update Script"
echo "================================"

PROJECT_DIR="/var/www/schizoidlloyd"

# Change to project directory
cd $PROJECT_DIR

echo "Pulling latest changes from GitHub..."
# Stash any local changes (like collected static files, db, etc.)
sudo -u www-data git stash
sudo -u www-data git pull origin main

echo "Installing/updating Python dependencies..."
sudo -u www-data $PROJECT_DIR/venv/bin/pip install -r requirements.txt --upgrade

echo "Running migrations..."
sudo -u www-data $PROJECT_DIR/venv/bin/python manage.py migrate

echo "Collecting static files..."
sudo -u www-data $PROJECT_DIR/venv/bin/python manage.py collectstatic --noinput

echo "Restarting Gunicorn..."
sudo systemctl restart gunicorn

echo "Reloading Nginx..."
sudo systemctl reload nginx

echo ""
echo "================================"
echo "Update Complete!"
echo "================================"
echo ""
echo "Service status:"
sudo systemctl status gunicorn --no-pager | head -5
echo ""
echo "Recent logs:"
sudo journalctl -u gunicorn -n 20 --no-pager
echo ""