var axios = require('axios');

var data = {
 title: 'Mytitle',
 content: 'my content'
}
axios.post('http://localhost:3000/posts',data);
