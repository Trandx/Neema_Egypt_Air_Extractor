SELECT public.ab_disable_trigger('customer, invoice', false);
DROP FUNCTION IF EXISTS public.ab_disable_trigger;

CREATE OR REPLACE FUNCTION public.ab_disable_trigger(tables_name TEXT, table_status BOOLEAN)
RETURNS BOOLEAN
LANGUAGE plpgsql
AS $function$
DECLARE
    cmd TEXT := '';
    _table TEXT;
    cmd_action TEXT;
    msg TEXT;
BEGIN
    RAISE NOTICE 'fn = ab_disable_trigger start';

    IF table_status IS TRUE THEN
        cmd_action :='DISABLE';
    ELSE
        cmd_action :='ENABLE';
    END IF;

    FOREACH _table IN ARRAY regexp_split_to_array(tables_name, ',')
    LOOP
        cmd := cmd || ' ALTER TABLE ' || _table || ' ' || cmd_action || ' TRIGGER user;';

        RAISE NOTICE  '%', cmd;
    END LOOP;
    
    RAISE NOTICE  'final command: %', cmd;

    EXECUTE cmd;

    RAISE NOTICE 'fn = ab_disable_trigger end';

    RETURN TRUE;

EXCEPTION
    WHEN OTHERS THEN
        GET STACKED DIAGNOSTICS msg := MESSAGE_TEXT;
        RAISE EXCEPTION '%', msg;
        RETURN FALSE;
END;
$function$;
