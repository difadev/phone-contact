import {gql} from '@apollo/client'
export const GET_ALL_CONTACT = gql `
query GetContactList (
    $distinct_on: [contact_select_column!], 
    $limit: Int, 
    $offset: Int, 
    $order_by: [contact_order_by!], 
    $where: contact_bool_exp
) {
  contact(
      distinct_on: $distinct_on, 
      limit: $limit, 
      offset: $offset, 
      order_by: $order_by, 
      where: $where
  ){
    first_name
    id
    last_name
    phones {
      number
    }
  }
}
`

export const DETAIL_CONTACT = gql`
query GetContactDetail($id: Int!){
  contact_by_pk(id: $id) {
  last_name
  id
  first_name
  phones {
    number
  }
}
}
`