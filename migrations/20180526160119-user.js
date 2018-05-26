module.exports = {
  up: ({ sequelize: db }) => db.transaction(async (transaction) => {
    await db.query(`CREATE TABLE IF NOT EXISTS public.users (
      id serial NOT NULL,
      user_name character varying(32) NOT NULL,
      password character(64),
      salt character(64),
      email character varying,
      first_name character varying(32),
      last_name character varying(32),
      activation_token uuid,
      "created_at" timestamp with time zone NOT NULL,
      "updated_at" timestamp with time zone NOT NULL,
      CONSTRAINT users_pkey PRIMARY KEY (id)
    )`, { transaction })
    await db.query('CREATE UNIQUE INDEX IF NOT EXISTS users_user_name ON public.users USING btree (user_name)', { transaction })
    await db.query('CREATE UNIQUE INDEX IF NOT EXISTS users_email ON public.users USING btree (email)', { transaction })
  }),
  down: ({ sequelize: db }) => db.transaction(async (transaction) => {
    await db.query('DROP table users;', { transaction })
  })
}
