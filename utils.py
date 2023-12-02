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
                logger.info(f"IP {ip} banned successfully.")
            else:
                logger.info(f"Failed to ban IP {ip}. | Error code: {result.returncode}")
        except subprocess.TimeoutExpired as e:
            logger.info(f"IP {ip} banned successfully.")
        except subprocess.CalledProcessError as e:
            logger.info(f"Failed to ban IP {ip}.")
            logger.info(f"Error: {e}")
            logger.info(f"Script error output: {e.output}")
    else:
        logging.error("'expireAt' should be a digit.")
        
def unban_ips():
    try:
        subprocess.run(["bash", "scripts/ipunban.sh"])
        logger.info("IPs unbanned successfully.")
    except subprocess.CalledProcessError as e:
        logger.info("Error executing ipunban.sh:", e)
