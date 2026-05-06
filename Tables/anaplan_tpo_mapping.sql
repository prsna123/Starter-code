CREATE TABLE input.anaplan_tpo_mapping (
	id NVARCHAR(100) NOT NULL,
	anaplan_event_id NVARCHAR(100) NOT NULL,
	anaplan_slogan_id NVARCHAR(100) NULL,
	anaplan_tactic_id NVARCHAR(100) NOT NULL,
	tpo_event_id NVARCHAR(100) NULL,
	tpo_tactic_id UNIQUEIDENTIFIER NOT NULL,
	tpo_slogan_id UNIQUEIDENTIFIER NULL,
	CONSTRAINT PK_anaplan_tpo_mapping PRIMARY KEY CLUSTERED (id),
	CONSTRAINT UQ_anaplan_tpo_mapping UNIQUE (anaplan_tactic_id, tpo_tactic_id),
	CONSTRAINT FK_anaplan_tpo_mapping_tpo_tactic_id FOREIGN KEY (tpo_tactic_id) REFERENCES input.promo_variants (tpo_tactic_id),
	CONSTRAINT FK_anaplan_tpo_mapping_tpo_slogan_id FOREIGN KEY (tpo_slogan_id) REFERENCES input.promo_slogan (tpo_slogan_id)
);