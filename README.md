Archipelago Hint System
=======================

This project aims to provide hints for randomizer seeds created through the Archipelago Randomizer.
It relies on the generated spoiler log to do this, but allows for connecting directly to the AP
server to dynamically serve the hints.

The hints are loosely modelled after the hints in Ocarina of Time Randomizer. This means that you
can get "Way of the Hero", "Barren" and other misc hints.

Features
--------

* Parses the spoiler log to understand the game layout
* Categorizes all checks to sort them into regions, and importance
* Generates relevant hints tailored to the game
* Behaves like a tracker, and will provide hints after finding enough checks.

Supported Games
---------------

Each game has to be added separately, since the spoiler log is not in a consistent format. Support
exists for the games in the following table, with each column meaning:

* regions - Will understand that "Blah Village - Chest" and "Blah Village - Well" are in a region
  named "Blah Village"
* specific hints - Knows about important item or location checks, and can generate specific hints
  for them
* advanced items - Has logic to know whether certain items are actually important to get hinted.
  Things like "Triforce Pieces" in Triforce hunt, for example, should not be marked "Way of the
  Hero", because they would just clog everything up. But, neither is the area "Barren", since the
  item is important.

| game | regions | misc hints | advanced items | notes |
|-|-|-|-|-|
| Doom 1993 | ✅ | ❌ | ✅ | Regions = levels
| Factorio | ❌ | ❌ | ❌ | The way checks are stuctured makes it very difficult to generate hints.
| Final Fantasy | ✅ | ❌ | ✅ | |
| Minecraft | ✅ | ❌ | ❌ | Regions = advancement categories.
| Ocarina of Time | ❌ | ❌ | ❌ | This game already supports hints, adding them would be redundant
| Pokémon Red / Blue | ✅ | ✅ | ✅ | Regions = cities/routes/dungeons. Will hint HMs, keys and other things
| Stardew Valley | ✅ | ✅ | ❌ | The checks are largely unstructured, so the regions are made up. Details will be provided later.
| Super Mario World | ✅ | ❌ | ✅ | Regions = Overworld areas
| Timespinner | ✅ | ❌ | ❌ | Regions = Game areas

More games, and better support for existing games, will come in the future.

Special Thanks
--------------

* The members of the Bad At Video Games Fellowship Discord server, who have been feeding my Archipelago addiction. In particular, shout outs to Myrph, T3Cube and MaxLSilver!
  [![](https://dcbadge.vercel.app/api/server/Cc6chzekTK)](https://discord.gg/Cc6chzekTK)
* [Archipelago](https://archipelago.gg) themselves, for making a cool randomizer and continuously expanding it