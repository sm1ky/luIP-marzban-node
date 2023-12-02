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
            result = subprocess.run(args, text=True, timeout=3)
            if result.returncode == 0:
                logging.info(f"IP {ip} banned successfully.")
            else:
                logging.info(f"Failed to ban IP {ip}. | Error code: {result.returncode}")
        except subprocess.TimeoutExpired as e:
            logging.info(f"IP {ip} banned successfully.")
        except subprocess.CalledProcessError as e:
            logging.logging(f"Failed to ban IP {ip}.")
            logging.info(f"Error: {e}")
            logging.info(f"Script error output: {e.output}")
    else:
        logging.error("'expireAt' should be a digit.")
        
def unban_ips():
    try:
        subprocess.run(["bash", "scripts/ipunban.sh"])
        logging.info("IPs unbanned successfully.")
    except subprocess.CalledProcessError as e:
        logging.info("Error executing ipunban.sh:", e)
