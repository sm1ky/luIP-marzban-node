import subprocess

import logging

def ban_ip(params):
    logging.info(f"Received ban event: {params}")
    script_path = "scripts/ipban.sh"
    ip = params.get("ip", "")
    expire_at = params.get("expireAt", "")
    
    if expire_at.isdigit():
        args = ["bash", script_path, ip, expire_at]
        
        try:
            result = subprocess.run(args, capture_output=True, text=True, check=True, timeout=3)
            print(f"Script output: {result.stdout}")
            print(f"IP {ip} banned successfully.")
        except subprocess.TimeoutExpired as e:
            print(f"IP {ip} banned successfully.")
        except subprocess.CalledProcessError as e:
            print(f"Failed to ban IP {ip}.")
            print(f"Error: {e}")
            print(f"Script error output: {e.output}")
    else:
        logging.error("'expireAt' should be a digit.")
        
def unban_ips():
    try:
        subprocess.run(["bash", "scripts/ipunban.sh"], check=True)
        print("IPs unbanned successfully.")
    except subprocess.CalledProcessError as e:
        print("Error executing ipunban.sh:", e)
