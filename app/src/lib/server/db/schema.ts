import { sqliteTable, integer, text, real } from "drizzle-orm/sqlite-core"
import { sql } from "drizzle-orm"

export const aac = sqliteTable("AAC", {
	recNum: integer("rec_num").primaryKey().notNull(),
	ageUponOutcome: text("age_upon_outcome"),
	animalId: text("animal_id").notNull(),
	animalType: text("animal_type"),
	breed: text(),
	color: text(),
	dateOfBirth: text("date_of_birth"),
	datetime: text(),
	monthyear: text(),
	name: text(),
	outcomeSubtype: text("outcome_subtype"),
	outcomeType: text("outcome_type"),
	sexUponOutcome: text("sex_upon_outcome"),
	locationLat: real("location_lat"),
	locationLong: real("location_long"),
	ageUponOutcomeInWeeks: real("age_upon_outcome_in_weeks"),
});

