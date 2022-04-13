CREATE TABLE IF NOT EXISTS big_data(
  id serial PRIMARY KEY,
  name text NOT NULL,
  surname text NOT NULL,
  fullname text,
  email text NOT NULL,
  phone text,
  city text NOT NULL,
  street text,
  postcode integer
);
