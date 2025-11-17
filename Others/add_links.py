import pandas as pd

df = pd.read_csv("Tourism.csv")

# Clean Title
title_clean = df["Title"].astype(str).str.replace(r"\s+", "", regex=True)

# Clean Department: remove everything after "(" and all whitespaces
dept_clean = (
    df["Department"]
    .astype(str)
    .str.split("(", n=1)
    .str[0]
    .str.replace(r"\s+", "", regex=True)
)

# Build Link
df["Link"] = "Others/activity_ims/" + title_clean + dept_clean + ".jpg"

df.to_csv("Tourism1.csv", index=False)
