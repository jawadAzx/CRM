import shlex
import sys
import subprocess
from pathlib import Path
import yaml


def run_cmd(cmd):
    o = subprocess.check_output(cmd, shell=True)
    o = o.decode().strip()
    return o


def run_cmd_popen(cmd):
    p = subprocess.Popen(
        cmd,
        stdout=subprocess.PIPE,
        stderr=subprocess.STDOUT,
        shell=True,
        executable="/bin/bash",
    )
    while True:
        output = p.stdout.readline()
        if p.poll() is not None:
            break
        if output:
            print(output.decode().strip())
    rc = p.poll()
    if rc != 0:
        raise subprocess.CalledProcessError


def run_script(script):
    for cmd in script:
        run_cmd_popen(cmd)


def get_script_from_tag(runcode_yaml_path, rc_yaml_tag):
    with open(runcode_yaml_path, "r") as f:
        data = yaml.safe_load(f)
    script = data.get(rc_yaml_tag, [])
    return script


def get_event_type(create_lock, start_lock):
    create_lock = Path(create_lock)
    start_lock = Path(start_lock)
    if create_lock.is_file():
        if start_lock.is_file():
            return "refresh"
        else:
            return "start"
    else:
        return "create"


def exec_create_block(runcode_yaml_path, create_lock):
    script = get_script_from_tag(runcode_yaml_path, "onCreate")
    if not script:
        return
    Path(create_lock).touch()
    run_script(script)


def exec_start_block(runcode_yaml_path, start_lock):
    script = get_script_from_tag(runcode_yaml_path, "onStart")
    if not script:
        return
    Path(start_lock).touch()
    run_script(script)


def exec_refresh_block(runcode_yaml_path):
    script = get_script_from_tag(runcode_yaml_path, "onRefresh")
    if not script:
        return
    run_script(script)


def main():
    runcode_yaml_path = "/home/ubuntu/workspace/.runcode.yaml"
    create_lock = "/home/ubuntu/runcode/create.lock"
    start_lock = "/tmp/start.lock"
    event_type = get_event_type(create_lock, start_lock)

    if not Path(runcode_yaml_path).exists():
        return

    if event_type == "create":
        exec_create_block(runcode_yaml_path, create_lock)
        exec_start_block(runcode_yaml_path, start_lock)
        exec_refresh_block(runcode_yaml_path)

    if event_type == "start":
        exec_start_block(runcode_yaml_path, start_lock)
        exec_refresh_block(runcode_yaml_path)

    if event_type == "refresh":
        exec_refresh_block(runcode_yaml_path)


main()
