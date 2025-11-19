# simple python-side mock trainer for packaging
import json, os, time, random

def mock_train(out_dir: str = "out", steps: int = 10):
    os.makedirs(out_dir, exist_ok=True)
    for i in range(1, steps+1):
        ckpt = {"step": i, "loss": round(random.random()*0.1 + 1.0/i, 6)}
        with open(os.path.join(out_dir, f"checkpoint-{i}.json"), "w") as f:
            json.dump(ckpt, f, indent=2)
        print(f"Saved checkpoint {i}")
        time.sleep(0.05)
    return out_dir
