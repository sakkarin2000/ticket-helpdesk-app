const queries = {
  create_ticket: 'insert into ticket (title, description, contact_info) values ($1, $2, $3);',
  update_ticket_status: 'update ticket set status = $1, updated_at = current_timestamp where id =  $2',
  update_ticket_info:
    'update ticket set title = $1 , description = $2 , contact_info = $3, updated_at = current_timestamp where id = $4;',
  get_ticket_w_status_filter:
    'select ticket.id as ticket_id, title, description, contact_info, created_at, updated_at, status, status_name_en from ticket join status s on s.id = ticket.status where status = $1 order by updated_at LIMIT $2 OFFSET $3',
  // for table select with filter
  get_ticket:
    'select ticket.id as ticket_id, title, description, contact_info, created_at, updated_at, status, status_name_en from ticket join status s on s.id = ticket.status order by updated_at LIMIT $1 OFFSET $2;',
  // for kanban ui, and table with no filter and load on scroll
  // add additional queries here
};

export default queries;
