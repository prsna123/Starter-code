CREATE TABLE dev_test.promo_funding (
    -- Primary Key
    id UNIQUEIDENTIFIER NOT NULL CONSTRAINT DF_promo_funding_id DEFAULT NEWSEQUENTIALID(),
    
    -- Foreign Keys
    promo_funding_scenario_id UNIQUEIDENTIFIER NOT NULL,
    event_id UNIQUEIDENTIFIER NULL, -- FK to promo_calendar
    tpo_tactic_id UNIQUEIDENTIFIER NOT NULL,
    product_id BIGINT NOT NULL,
    
    -- Categorization & Logic
    fund_type NVARCHAR(50) NULL,
    purchase_requirement NVARCHAR(255) NULL,
    reward_type NVARCHAR(50) NULL,
    payment_method NVARCHAR(50) NULL,
    compensation_method NVARCHAR(50) NULL,

    -- Financials & Volumes (Using Decimal for accuracy)
    units DECIMAL(18, 4) NULL,
    units_list_price DECIMAL(18, 4) NULL,
    everyday_shelf_price DECIMAL(18, 4) NULL, 
    promoted_shelf_price DECIMAL(18, 4) NULL, 
    
    scan_rate DECIMAL(18, 6) NULL,
    scan_units DECIMAL(18, 4) NULL,
    calc_scan_lump_sum DECIMAL(18, 4) NULL,
    planned_lump_sum DECIMAL(18, 4) NULL,
    le_tactic_spend DECIMAL(18, 4) NULL,
    
    dollar_per_unit DECIMAL(18, 4) NULL, 
    percentage_per_unit DECIMAL(18, 4) NULL, 
    
    scan DECIMAL(18, 6) NULL,
    reward DECIMAL(18, 4) NULL,
    redemption_rate DECIMAL(10, 6) NULL,
    lift_overide DECIMAL(10, 6) NULL, 
    -- Constraints
    CONSTRAINT PK_promo_funding PRIMARY KEY CLUSTERED (id),
    
    -- Relationships
    CONSTRAINT FK_promo_funding_scenario_id FOREIGN KEY (promo_funding_scenario_id) REFERENCES dev_test.scenario (scenario_id),
    CONSTRAINT FK_promo_funding_event_id FOREIGN KEY (event_id) REFERENCES dev_test.promo_calendar (id),
    CONSTRAINT FK_promo_funding_tpo_tactic_id FOREIGN KEY (tpo_tactic_id) REFERENCES dev_test.promo_variants (tpo_tactic_id),
    CONSTRAINT FK_promo_funding_product_id FOREIGN KEY (product_id) REFERENCES dev_test.dim_product (product_id),
    
);