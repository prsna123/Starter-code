CREATE TABLE input.promo_calendar (
    -- Primary Key
    id UNIQUEIDENTIFIER NOT NULL CONSTRAINT DF_promo_calendar_id DEFAULT NEWSEQUENTIALID(),
    
    -- Foreign Keys & Core Identifiers
    promo_calendar_scenario_id UNIQUEIDENTIFIER NOT NULL,
    event_id UNIQUEIDENTIFIER NOT NULL, 
    tpo_slogan_id UNIQUEIDENTIFIER NULL,
    tpo_tactic_id UNIQUEIDENTIFIER NOT NULL,
    customer_id BIGINT NULL,
    geo INT NULL, 
    
    -- Tactic Dates 
    tactic_instore_start_date DATETIME NULL,
    tactic_instore_end_date DATETIME NULL,
    tactic_shipment_start_date DATETIME NULL,
    tactic_shipment_end_date DATETIME NULL,
    
    -- Slogan Dates 
    slogan_instore_start_date DATETIME NULL,
    slogan_instore_end_date DATETIME NULL,
    slogan_shipment_start_date DATETIME NULL,
    slogan_shipment_end_date DATETIME NULL,
    
    -- Status Flags 
    is_deleted BIT NOT NULL CONSTRAINT DF_promo_calendar_is_deleted DEFAULT 0,
    is_edited BIT NOT NULL CONSTRAINT DF_promo_calendar_is_edited DEFAULT 0,

    -- Constraints
    CONSTRAINT PK_promo_calendar PRIMARY KEY CLUSTERED (id),
    
    CONSTRAINT UQ_promo_calendar_event UNIQUE (event_id, tpo_tactic_id, tpo_slogan_id),
    
    -- Relationships
    CONSTRAINT FK_promo_calendar_scenario_id FOREIGN KEY (promo_calendar_scenario_id) REFERENCES input.scenario (scenario_id),
    CONSTRAINT FK_promo_calendar_tpo_slogan_id FOREIGN KEY (tpo_slogan_id) REFERENCES input.promo_slogan (tpo_slogan_id),
    CONSTRAINT FK_promo_calendar_tpo_tactic_id FOREIGN KEY (tpo_tactic_id) REFERENCES input.promo_variants (tpo_tactic_id),
    CONSTRAINT FK_promo_calendar_customer_id FOREIGN KEY (customer_id) REFERENCES input.dim_customer (customer_id),
    CONSTRAINT FK_promo_calendar_geo FOREIGN KEY (geo) REFERENCES input.dim_geo (geo_id) 
);