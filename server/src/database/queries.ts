const queries = {
  create_ticket: 'insert into ticket (title, description, contact_info) values ($1, $2, $3);',
  update_ticket_status: 'update ticket set status = $1, updated_at = current_timestamp where id =  $2',
  update_ticket_info:
    'update ticket set title = $1 , description = $2 , contact_info = $3, updated_at = current_timestamp where id = $4;',
  update_ticket_info_and_status:
    'update ticket set title = $1 , description = $2 , contact_info = $3, status = $4, updated_at = current_timestamp where id = $5;',
  update_ticket_info_resolve:
    'update ticket set title = $1 , description = $2 , contact_info = $3, status=2, updated_at = current_timestamp where id = $4;',
  check_ticket_is_rejected: 'select status = -1 as is_rejected from ticket where id =$1',
  get_ticket_w_status_filter:
    'select ticket.id as ticket_id, title, description, contact_info, created_at, updated_at, status, status_name_en from ticket join status s on s.id = ticket.status where status = $1 order by updated_at desc  LIMIT $2 OFFSET $3',
  // for table select with filter
  get_ticket:
    'select ticket.id as ticket_id, title, description, contact_info, created_at, updated_at, status, status_name_en from ticket join status s on s.id = ticket.status order by updated_at desc LIMIT $1 OFFSET $2;',
  get_count_ticket_w_status_filter_total: 'select count(*)::integer from ticket where status = $1',
  get_count_ticket_total: 'select count(*)::integer from ticket',
  // for kanban ui, and table with no filter and load on scroll
  // add additional queries here
};

export default queries;
