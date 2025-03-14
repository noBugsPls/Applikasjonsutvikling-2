CREATE TABLE patterns (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  difficulty TEXT,
  category TEXT,
  sizes JSONB,
  chest_width_in_cm JSONB,
  gauge JSONB,
  materials JSONB,
  instructions JSONB,
  image TEXT,
  author TEXT
);
