/// <reference types="vitest" />
import { afterAll, beforeAll, expect, test } from "vitest";
import { execSql, client as sqlite } from "../src/lib/server/db";
import { listAAC } from "../src/lib/services/aacService";

beforeAll(() => {
  execSql(`
    PRAGMA journal_mode=WAL;
    CREATE TABLE IF NOT EXISTS AAC (
      rec_num INTEGER PRIMARY KEY NOT NULL,
      age_upon_outcome TEXT,
      animal_id TEXT NOT NULL,
      animal_type TEXT,
      breed TEXT,
      color TEXT,
      date_of_birth TEXT,
      datetime TEXT,
      monthyear TEXT,
      name TEXT,
      outcome_subtype TEXT,
      outcome_type TEXT,
      sex_upon_outcome TEXT,
      location_lat REAL,
      location_long REAL,
      age_upon_outcome_in_weeks REAL
    );
    DELETE FROM AAC;
    INSERT INTO AAC (rec_num,animal_id,animal_type,breed,datetime,outcome_type,location_lat,location_long,name)
    VALUES
      (1,'A1','Dog','Pit Bull','2024-01-01T10:00:00Z','Adoption',30.27,-97.74,'Milo'),
      (2,'A2','Cat','Tabby','2024-01-02T10:00:00Z',NULL,30.27,-97.74,'Zoe');
  `);
});

afterAll(() => sqlite.close());

test("filters species and paginates", async () => {
  const res = await listAAC({ species: "Dog", page: 1, size: 10 });
  expect(res.total).toBe(1);
  expect(res.items[0].name).toBe("Milo");
});

test("location bounding box is optional and safe", async () => {
  const res = await listAAC({ location: "30.27,-97.74,5", page: 1, size: 10 });
  expect(res.total).toBe(2);
});

