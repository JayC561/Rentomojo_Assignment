<h1>Rentomojo Backend Assignment</h1>

<h3><b>Libraries & Packages:</b></h3>
<ul>
  <li><b>Express JS</b> - For API Route Handling</li>
  <li><b>Mogoose</b> - For database connection with MongoDB Atlas</li>
  <li><b>Mogoose Type Email</b> - Mongoose plugin for email validation</li>
  <li><b>Mogoose Unique Validator</b> - Mogoose plugin for unique value validation</li>
  <li><b>Dotenv</b> - To store environment variables</li>
  <li><b>Mongoose Paginate</b>< - For pagination and sending 10 contacts per page</li>
</ul>

<h3><b>Routes:</b></h3>

<li><b>GET /api/persons/</b> : sends 10 contacts of first page</li>
&nbsp;
<li><b>GET /api/persons/?page=pageno</b> : sends 10 contacts of that specific page</li>
&nbsp;
<li><b>GET /api/persons/:id</b> : sends specific contact with a matching ID</li>
&nbsp;
<li><b>DELETE /api/persons/:id</b> : deletes contact with matching ID</li>
&nbsp;
<li><b>PUT /api/persons/:id</b> : deletes contact with matching ID</li>
&nbsp;
<li><b>POST /api/persons/</b> : adds a contact to the database</li>
