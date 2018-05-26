module.exports = {
  up: ({ sequelize: db }) => db.transaction(async (transaction) => {
    await db.query(`CREATE TABLE IF NOT EXISTS public.projects (
      id serial NOT NULL,
      name character varying(128) NOT NULL,
      owner_id integer NOT NULL,
      "created_at" timestamp with time zone NOT NULL,
      "updated_at" timestamp with time zone NOT NULL,
      CONSTRAINT projects_pkey PRIMARY KEY (id),
      CONSTRAINT projects_users_owner_id_fkey FOREIGN KEY (owner_id)
          REFERENCES public.users (id) MATCH SIMPLE
          ON UPDATE CASCADE
          ON DELETE CASCADE
    )`, { transaction })
  }),
  down: ({ sequelize: db }) => db.transaction(async (transaction) => {
    await db.query('DROP table projects;', { transaction })
  })
}
