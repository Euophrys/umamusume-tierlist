import requests
from bs4 import BeautifulSoup
import time

BASE_URL = "https://xn--gck1f423k.xn--1bvt37a.tools/supports/{}/event"
CARD_IDS = [30136, 30137, 30138]  # Example IDs

TARGET_STATS = ["スピード", "スタミナ", "パワー", "根性", "賢さ", "体力", "スキルPt", "絆"]

def parse_event_choice(ul):
    """Extracts stats from a <ul> containing event results."""
    stats = {k: 0 for k in TARGET_STATS}
    for li in ul.find_all("li"):
        spans = li.find_all("span")
        if len(spans) >= 2:
            name = spans[0].get_text(strip=True)
            value_text = spans[1].get_text(strip=True).replace("+", "")
            try:
                value = int(value_text)
            except ValueError:
                continue
            if name in stats:
                stats[name] += value
    return stats

def sum_stats(stats_list):
    """Returns the highest total stats from a list of choices."""
    return max(stats_list, key=lambda s: sum(s.values()), default={k: 0 for k in TARGET_STATS})

def extract_events(html):
    soup = BeautifulSoup(html, "html.parser")
    results = {k: 0 for k in TARGET_STATS}

    # Find section with "連続イベント"
    header = soup.find(lambda tag: tag.name in ["h1", "div"] and "連続イベント" in tag.get_text())
    if not header:
        return results

    # Find all event containers after the header
    container = header.find_parent()
    tiles = container.find_all("div", style=lambda x: x and "background-color:#22B2FA" in x)

    for tile in tiles:
        # Find all ULs of this event
        uls = tile.find_all("ul", class_=lambda c: c and "supportCardEventContents_component_result" in c)
        if not uls:
            continue
        
        # Extract stats from each choice, pick the best
        choice_stats = [parse_event_choice(ul) for ul in uls]
        best_choice = sum_stats(choice_stats)

        for k in TARGET_STATS:
            results[k] += best_choice[k]

    return results

for card_id in range(20068,20090):
    url = BASE_URL.format(card_id)
    r = requests.get(url)
    r.encoding = r.apparent_encoding  # Ensure proper Japanese decoding
    stats = extract_events(r.text)
    values = [stats[k] for k in TARGET_STATS]
    print(f"{card_id}: {values},")
    time.sleep(0.2)
