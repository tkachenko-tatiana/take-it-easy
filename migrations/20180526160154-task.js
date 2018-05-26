module.exports = {
  up: ({ sequelize: db }) => db.transaction(async (transaction) => {
    await db.query(`CREATE TABLE IF NOT EXISTS public.tasks (
      id serial NOT NULL,
      name character varying(128) NOT NULL,
      status integer NOT NULL,
      project_id integer NOT NULL,
      "created_at" timestamp with time zone NOT NULL,
      "updated_at" timestamp with time zone NOT NULL,
      CONSTRAINT tasks_pkey PRIMARY KEY (id),
      CONSTRAINT tasks_projects_project_id_fkey FOREIGN KEY (project_id)
          REFERENCES public.projects (id) MATCH SIMPLE
          ON UPDATE CASCADE
          ON DELETE CASCADE
    )`, { transaction })
  }),
  down: ({ sequelize: db }) => db.transaction(async (transaction) => {
    await db.query('DROP table tasks;', { transaction })
  })
}
