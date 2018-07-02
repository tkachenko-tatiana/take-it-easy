// export { default } from './TaskForm.jsx'
import { graphql, compose } from 'react-apollo'
import TaskForm from './TaskForm.jsx'

import ADD_TASK_MUTATION from './mutation.graphql'

const TaskFormWithGraphQL = compose(
  graphql(ADD_TASK_MUTATION, {
    props: (props) => ({
      handleSubmit: (payload) => {
        console.log('33333', payload)
        // props.mutate({
        //   variables: payload
        // }).then((resp) => {
        //   console.log('resp: ', resp)
        // }).catch(err => console.log('Error: ', err))
      }
    })
  })
)(TaskForm)

export default TaskFormWithGraphQL
