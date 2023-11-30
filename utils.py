import subprocess

def ban_ip(params):
    script_path = "scripts/ipban.sh"
    args = ["bash", script_path, params["ip"], str(params["expireAt"])]

    try:
        result = subprocess.run(args, capture_output=True, text=True, check=True)
        print(f"IP {params['ip']} banned successfully.")
    except subprocess.CalledProcessError as e:
        print(f"Failed to ban IP {params['ip']}.")
        print("Error:", e)
        
def unban_ips():
    try:
        subprocess.run(["bash", "scripts/ipunban.sh"], check=True)
        print("IPs unbanned successfully.")
    except subprocess.CalledProcessError as e:
        print("Error executing ipunban.sh:", e)
