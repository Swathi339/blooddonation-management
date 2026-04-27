import json

# Load JSON from your file
with open("dis.json", "r", encoding="utf-8") as file:
    data = json.load(file)

states_output = []
districts_output = []

state_id_counter = 1
district_id_counter = 1

for state_entry in data["states"]:
    state_name = state_entry["state"]

    # Add to states list
    states_output.append({
        "id": str(state_id_counter),
        "name": state_name
    })

    # Add each district with state_id
    for district in state_entry["districts"]:
        districts_output.append({
            "id": str(district_id_counter),
            "state_id": str(state_id_counter),
            "name": district
        })
        district_id_counter += 1

    state_id_counter += 1

# Save to states.json
with open("states.json", "w", encoding="utf-8") as f:
    json.dump(states_output, f, indent=3, ensure_ascii=False)

# Save to districts.json
with open("districts.json", "w", encoding="utf-8") as f:
    json.dump(districts_output, f, indent=3, ensure_ascii=False)

print("✅ states.json and districts.json created successfully.")
