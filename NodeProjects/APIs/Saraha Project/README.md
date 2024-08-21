<div id="content"><a class="edit-docs-link" href="https://github.com/Automattic/mongoose/blob/master/docs/middleware.md" target="_blank">
<img src="/docs/images/pencil.svg">
</a><h1 id="middleware">Middleware</h1>
<div class="sponsored-ad">
  <a href="https://localizejs.com/?utm_campaign=Mongoose&amp;utm_source=mongoose&amp;utm_medium=banner">
    <img src="/docs/images/localize-mongoose-ad-banner-2x.jpg">
  </a>
</div>

<p>Middleware (also called pre and post <em>hooks</em>) are functions which are passed
control during execution of asynchronous functions. Middleware is specified
on the schema level and is useful for writing <a href="plugins.html">plugins</a>.</p>
<ul class="toc">
  <li><a href="#types-of-middleware">Types of Middleware</a></li>
  <li><a href="#pre">Pre</a></li>
  <li><a href="#error-handling">Errors in Pre Hooks</a></li>
  <li><a href="#post">Post</a></li>
  <li><a href="#post-async">Asynchronous Post Hooks</a></li>
  <li><a href="#defining">Define Middleware Before Compiling Models</a></li>
  <li><a href="#order">Save/Validate Hooks</a></li>
  <li><a href="#accessing-parameters-in-middleware">Accessing Parameters in Middleware</a></li>
  <li><a href="#naming">Naming Conflicts</a></li>
  <li><a href="#notes">Notes on findAndUpdate() and Query Middleware</a></li>
  <li><a href="#error-handling-middleware">Error Handling Middleware</a></li>
  <li><a href="#aggregate">Aggregation Hooks</a></li>
  <li><a href="#synchronous">Synchronous Hooks</a></li>
</ul>

<h2 id="types-of-middleware">Types of Middleware</h2>
<p>Mongoose has 4 types
of middleware: document middleware, model middleware, aggregate middleware, and query middleware.</p>
<p>Document middleware is supported for the following document functions.
In Mongoose, a document is an instance of a <code>Model</code> class.
In document middleware functions, <code>this</code> refers to the document. To access the model, use <code>this.constructor</code>.</p>
<ul>
<li><a href="api/document.html#document_Document-validate">validate</a></li>
<li><a href="api/model.html#model_Model-save">save</a></li>
<li><a href="api/model.html#model_Model-remove">remove</a></li>
<li><a href="api/document.html#document_Document-updateOne">updateOne</a></li>
<li><a href="api/model.html#model_Model-deleteOne">deleteOne</a></li>
<li><a href="api/document.html#document_Document-init">init</a> (note: init hooks are <a href="#synchronous">synchronous</a>)</li>
</ul>
<p>Query middleware is supported for the following Query functions.
Query middleware executes when you call <code>exec()</code> or <code>then()</code> on a Query object, or <code>await</code> on a Query object.
In query middleware functions, <code>this</code> refers to the query.</p>
<ul>
<li><a href="api/query.html#query_Query-count">count</a></li>
<li><a href="api/query.html#query_Query-countDocuments">countDocuments</a></li>
<li><a href="api/query.html#query_Query-deleteMany">deleteMany</a></li>
<li><a href="api/query.html#query_Query-deleteOne">deleteOne</a></li>
<li><a href="api/query.html#query_Query-estimatedDocumentCount">estimatedDocumentCount</a></li>
<li><a href="api/query.html#query_Query-find">find</a></li>
<li><a href="api/query.html#query_Query-findOne">findOne</a></li>
<li><a href="api/query.html#query_Query-findOneAndDelete">findOneAndDelete</a></li>
<li><a href="api/query.html#query_Query-findOneAndReplace">findOneAndReplace</a></li>
<li><a href="api/query.html#query_Query-findOneAndUpdate">findOneAndUpdate</a></li>
<li><a href="api/model.html#model_Model-remove">remove</a></li>
<li><a href="api/query.html#query_Query-replaceOne">replaceOne</a></li>
<li><a href="api/query.html#query_Query-updateOne">updateOne</a></li>
<li><a href="api/query.html#query_Query-updateMany">updateMany</a></li>
<li><a href="validation.html#update-validators">validate</a></li>
</ul>
<p>Aggregate middleware is for <code>MyModel.aggregate()</code>.
Aggregate middleware executes when you call <code>exec()</code> on an aggregate object.
In aggregate middleware, <code>this</code> refers to the <a href="api/model.html#model_Model-aggregate">aggregation object</a>.</p>
<ul>
<li><a href="api/model.html#model_Model-aggregate">aggregate</a></li>
</ul>
<p>Model middleware is supported for the following model functions.
Don't confuse model middleware and document middleware: model middleware hooks into <em>static</em> functions on a <code>Model</code> class, document middleware hooks into <em>methods</em> on a <code>Model</code> class.
In model middleware functions, <code>this</code> refers to the model.</p>
<ul>
<li><a href="api/model.html#model_Model-bulkWrite">bulkWrite</a></li>
<li><a href="api/model.html#model_Model-createCollection">createCollection</a></li>
<li><a href="api/model.html#model_Model-insertMany">insertMany</a></li>
</ul>
<p>Here are the possible strings that can be passed to <code>pre()</code></p>
<ul>
<li>aggregate</li>
<li>bulkWrite</li>
<li>count</li>
<li>countDocuments</li>
<li>createCollection</li>
<li>deleteOne</li>
<li>deleteMany</li>
<li>estimatedDocumentCount</li>
<li>find</li>
<li>findOne</li>
<li>findOneAndDelete</li>
<li>findOneAndReplace</li>
<li>findOneAndUpdate</li>
<li>init</li>
<li>insertMany</li>
<li>remove</li>
<li>replaceOne</li>
<li>save</li>
<li>update</li>
<li>updateOne</li>
<li>updateMany</li>
<li>validate</li>
</ul>
<p>All middleware types support pre and post hooks.
How pre and post hooks work is described in more detail below.</p>
<p><strong>Note:</strong> Mongoose registers <code>updateOne</code> middleware on <code>Query.prototype.updateOne()</code> by default.
This means that both <code>doc.updateOne()</code> and <code>Model.updateOne()</code> trigger <code>updateOne</code> hooks, but <code>this</code> refers to a query, not a document.
To register <code>updateOne</code> middleware as document middleware, use <code>schema.pre('updateOne', { document: true, query: false })</code>.</p>
<p><strong>Note:</strong> Like <code>updateOne</code>, Mongoose registers <code>deleteOne</code> middleware on <code>Query.prototype.deleteOne</code> by default.
That means that <code>Model.deleteOne()</code> will trigger <code>deleteOne</code> hooks, and <code>this</code> will refer to a query.
However, <code>doc.deleteOne()</code> does <strong>not</strong> fire <code>deleteOne</code> query middleware for legacy reasons.
To register <code>deleteOne</code> middleware as document middleware, use <code>schema.pre('deleteOne', { document: true, query: false })</code>.</p>
<p><strong>Note:</strong> The <a href="./api/model.html#model_Model-create"><code>create()</code></a> function fires <code>save()</code> hooks.</p>
<p><strong>Note:</strong> Query middlewares are not executed on subdocuments.</p>
<pre><code class="language-javascript"><span class="hljs-keyword">const</span> childSchema = <span class="hljs-keyword">new</span> mongoose.<span class="hljs-title class_">Schema</span>({
  <span class="hljs-attr">name</span>: <span class="hljs-title class_">String</span>
});

<span class="hljs-keyword">const</span> mainSchema = <span class="hljs-keyword">new</span> mongoose.<span class="hljs-title class_">Schema</span>({
  <span class="hljs-attr">child</span>: [childSchema]
});

mainSchema.<span class="hljs-title function_">pre</span>(<span class="hljs-string">'findOneAndUpdate'</span>, <span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) {
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">'Middleware on parent document'</span>); <span class="hljs-comment">// Will be executed</span>
});

childSchema.<span class="hljs-title function_">pre</span>(<span class="hljs-string">'findOneAndUpdate'</span>, <span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) {
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">'Middleware on subdocument'</span>); <span class="hljs-comment">// Will not be executed</span>
});
</code></pre>
<h2 id="pre"><a href="#pre">Pre</a></h2>

<p>Pre middleware functions are executed one after another, when each
middleware calls <code>next</code>.</p>
<pre><code class="language-javascript"><span class="hljs-keyword">const</span> schema = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Schema</span>({ <span class="hljs-comment">/* ... */</span> });
schema.<span class="hljs-title function_">pre</span>(<span class="hljs-string">'save'</span>, <span class="hljs-keyword">function</span>(<span class="hljs-params">next</span>) {
  <span class="hljs-comment">// do stuff {like hashing the password before saving into database instead of doing it in backend server.}</span>
  <span class="hljs-title function_">next</span>();
});
</code></pre>
<p>In <a href="http://thecodebarbarian.com/introducing-mongoose-5.html#promises-and-async-await-with-middleware">mongoose 5.x</a>, instead of calling <code>next()</code> manually, you can use a
function that returns a promise. In particular, you can use <a href="http://thecodebarbarian.com/common-async-await-design-patterns-in-node.js.html"><code>async/await</code></a>.</p>
<pre><code class="language-javascript">schema.<span class="hljs-title function_">pre</span>(<span class="hljs-string">'save'</span>, <span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">return</span> <span class="hljs-title function_">doStuff</span>().
    <span class="hljs-title function_">then</span>(<span class="hljs-function">() =&gt;</span> <span class="hljs-title function_">doMoreStuff</span>());
});

<span class="hljs-comment">// Or, using async functions</span>
schema.<span class="hljs-title function_">pre</span>(<span class="hljs-string">'save'</span>, <span class="hljs-keyword">async</span> <span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">await</span> <span class="hljs-title function_">doStuff</span>();
  <span class="hljs-keyword">await</span> <span class="hljs-title function_">doMoreStuff</span>();
});
</code></pre>
<p>If you use <code>next()</code>, the <code>next()</code> call does <strong>not</strong> stop the rest of the code in your middleware function from executing. Use
<a href="https://www.bennadel.com/blog/2323-use-a-return-statement-when-invoking-callbacks-especially-in-a-guard-statement.htm">the early <code>return</code> pattern</a>
to prevent the rest of your middleware function from running when you call <code>next()</code>.</p>
<pre><code class="language-javascript"><span class="hljs-keyword">const</span> schema = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Schema</span>({ <span class="hljs-comment">/* ... */</span> });
schema.<span class="hljs-title function_">pre</span>(<span class="hljs-string">'save'</span>, <span class="hljs-keyword">function</span>(<span class="hljs-params">next</span>) {
  <span class="hljs-keyword">if</span> (<span class="hljs-title function_">foo</span>()) {
    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">'calling next!'</span>);
    <span class="hljs-comment">// `return next();` will make sure the rest of this function doesn't run</span>
    <span class="hljs-comment">/* return */</span> <span class="hljs-title function_">next</span>();
  }
  <span class="hljs-comment">// Unless you comment out the `return` above, 'after next' will print</span>
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">'after next'</span>);
});
</code></pre>
<h3 id="use-cases"><a href="#use-cases">Use Cases</a></h3>

<p>Middleware are useful for atomizing model logic. Here are some other ideas:</p>
<ul>
<li>complex validation</li>
<li>removing dependent documents (removing a user removes all their blogposts)</li>
<li>asynchronous defaults</li>
<li>asynchronous tasks that a certain action triggers</li>
</ul>
<h3 id="error-handling"><a href="#error-handling">Errors in Pre Hooks</a></h3>

<p>If any pre hook errors out, mongoose will not execute subsequent middleware
or the hooked function. Mongoose will instead pass an error to the callback
and/or reject the returned promise. There are several ways to report an
error in middleware:</p>
<pre><code class="language-javascript">schema.<span class="hljs-title function_">pre</span>(<span class="hljs-string">'save'</span>, <span class="hljs-keyword">function</span>(<span class="hljs-params">next</span>) {
  <span class="hljs-keyword">const</span> err = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">'something went wrong'</span>);
  <span class="hljs-comment">// If you call `next()` with an argument, that argument is assumed to be</span>
  <span class="hljs-comment">// an error.</span>
  <span class="hljs-title function_">next</span>(err);
});

schema.<span class="hljs-title function_">pre</span>(<span class="hljs-string">'save'</span>, <span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) {
  <span class="hljs-comment">// You can also return a promise that rejects</span>
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
    <span class="hljs-title function_">reject</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">'something went wrong'</span>));
  });
});

schema.<span class="hljs-title function_">pre</span>(<span class="hljs-string">'save'</span>, <span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) {
  <span class="hljs-comment">// You can also throw a synchronous error</span>
  <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">'something went wrong'</span>);
});

schema.<span class="hljs-title function_">pre</span>(<span class="hljs-string">'save'</span>, <span class="hljs-keyword">async</span> <span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">await</span> <span class="hljs-title class_">Promise</span>.<span class="hljs-title function_">resolve</span>();
  <span class="hljs-comment">// You can also throw an error in an `async` function</span>
  <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">'something went wrong'</span>);
});

<span class="hljs-comment">// later...</span>

<span class="hljs-comment">// Changes will not be persisted to MongoDB because a pre hook errored out</span>
myDoc.<span class="hljs-title function_">save</span>(<span class="hljs-keyword">function</span>(<span class="hljs-params">err</span>) {
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(err.<span class="hljs-property">message</span>); <span class="hljs-comment">// something went wrong</span>
});
</code></pre>
<p>Calling <code>next()</code> multiple times is a no-op. If you call <code>next()</code> with an
error <code>err1</code> and then throw an error <code>err2</code>, mongoose will report <code>err1</code>.</p>
<h2 id="post"><a href="#post">Post middleware</a></h2>

<p><a href="api.html#schema_Schema-post">post</a> middleware are executed <em>after</em>
the hooked method and all of its <code>pre</code> middleware have completed.</p>
<pre><code class="language-javascript">schema.<span class="hljs-title function_">post</span>(<span class="hljs-string">'init'</span>, <span class="hljs-keyword">function</span>(<span class="hljs-params">doc</span>) {
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">'%s has been initialized from the db'</span>, doc.<span class="hljs-property">_id</span>);
});
schema.<span class="hljs-title function_">post</span>(<span class="hljs-string">'validate'</span>, <span class="hljs-keyword">function</span>(<span class="hljs-params">doc</span>) {
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">'%s has been validated (but not saved yet)'</span>, doc.<span class="hljs-property">_id</span>);
});
schema.<span class="hljs-title function_">post</span>(<span class="hljs-string">'save'</span>, <span class="hljs-keyword">function</span>(<span class="hljs-params">doc</span>) {
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">'%s has been saved'</span>, doc.<span class="hljs-property">_id</span>);
});
schema.<span class="hljs-title function_">post</span>(<span class="hljs-string">'deleteOne'</span>, <span class="hljs-keyword">function</span>(<span class="hljs-params">doc</span>) {
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">'%s has been deleted'</span>, doc.<span class="hljs-property">_id</span>);
});
</code></pre>
<h2 id="post-async"><a href="#post-async">Asynchronous Post Hooks</a></h2>

<p>If your post hook function takes at least 2 parameters, mongoose will assume the second parameter is a <code>next()</code> function that you will call to trigger the next middleware in the sequence.</p>
<pre><code class="language-javascript"><span class="hljs-comment">// Takes 2 parameters: this is an asynchronous post hook</span>
schema.<span class="hljs-title function_">post</span>(<span class="hljs-string">'save'</span>, <span class="hljs-keyword">function</span>(<span class="hljs-params">doc, next</span>) {
  <span class="hljs-built_in">setTimeout</span>(<span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) {
    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">'post1'</span>);
    <span class="hljs-comment">// Kick off the second post hook</span>
    <span class="hljs-title function_">next</span>();
  }, <span class="hljs-number">10</span>);
});

<span class="hljs-comment">// Will not execute until the first middleware calls `next()`</span>
schema.<span class="hljs-title function_">post</span>(<span class="hljs-string">'save'</span>, <span class="hljs-keyword">function</span>(<span class="hljs-params">doc, next</span>) {
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">'post2'</span>);
  <span class="hljs-title function_">next</span>();
});
</code></pre>
<p>You can also pass an async function to <code>post()</code>.
If you pass an async function that takes at least 2 parameters, you are still responsible for calling <code>next()</code>.
However, you can also pass in an async function that takes less than 2 parameters, and Mongoose will wait for the promise to resolve.</p>
<pre><code class="language-javascript">schema.<span class="hljs-title function_">post</span>(<span class="hljs-string">'save'</span>, <span class="hljs-keyword">async</span> <span class="hljs-keyword">function</span>(<span class="hljs-params">doc</span>) {
  <span class="hljs-keyword">await</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Promise</span>(<span class="hljs-function"><span class="hljs-params">resolve</span> =&gt;</span> <span class="hljs-built_in">setTimeout</span>(resolve, <span class="hljs-number">1000</span>));
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">'post1'</span>);
  <span class="hljs-comment">// If less than 2 parameters, no need to call `next()`</span>
});

schema.<span class="hljs-title function_">post</span>(<span class="hljs-string">'save'</span>, <span class="hljs-keyword">async</span> <span class="hljs-keyword">function</span>(<span class="hljs-params">doc, next</span>) {
  <span class="hljs-keyword">await</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Promise</span>(<span class="hljs-function"><span class="hljs-params">resolve</span> =&gt;</span> <span class="hljs-built_in">setTimeout</span>(resolve, <span class="hljs-number">1000</span>));
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">'post1'</span>);
  <span class="hljs-comment">// If there's a `next` parameter, you need to call `next()`.</span>
  <span class="hljs-title function_">next</span>();
});
</code></pre>
<h2 id="defining"><a href="#defining">Define Middleware Before Compiling Models</a></h2>

<p>Calling <code>pre()</code> or <code>post()</code> after <a href="models.html#compiling">compiling a model</a>
does <strong>not</strong> work in Mongoose in general. For example, the below <code>pre('save')</code>
middleware will not fire.</p>
<pre><code class="language-javascript"><span class="hljs-keyword">const</span> schema = <span class="hljs-keyword">new</span> mongoose.<span class="hljs-title class_">Schema</span>({ <span class="hljs-attr">name</span>: <span class="hljs-title class_">String</span> });

<span class="hljs-comment">// Compile a model from the schema</span>
<span class="hljs-keyword">const</span> <span class="hljs-title class_">User</span> = mongoose.<span class="hljs-title function_">model</span>(<span class="hljs-string">'User'</span>, schema);

<span class="hljs-comment">// Mongoose will **not** call the middleware function, because</span>
<span class="hljs-comment">// this middleware was defined after the model was compiled</span>
schema.<span class="hljs-title function_">pre</span>(<span class="hljs-string">'save'</span>, <span class="hljs-function">() =&gt;</span> <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">'Hello from pre save'</span>));

<span class="hljs-keyword">const</span> user = <span class="hljs-keyword">new</span> <span class="hljs-title class_">User</span>({ <span class="hljs-attr">name</span>: <span class="hljs-string">'test'</span> });
user.<span class="hljs-title function_">save</span>();
</code></pre>
<p>This means that you must add all middleware and <a href="plugins.html">plugins</a>
<strong>before</strong> calling <a href="api/mongoose.html#mongoose_Mongoose-model"><code>mongoose.model()</code></a>.
The below script will print out "Hello from pre save":</p>
<pre><code class="language-javascript"><span class="hljs-keyword">const</span> schema = <span class="hljs-keyword">new</span> mongoose.<span class="hljs-title class_">Schema</span>({ <span class="hljs-attr">name</span>: <span class="hljs-title class_">String</span> });
<span class="hljs-comment">// Mongoose will call this middleware function, because this script adds</span>
<span class="hljs-comment">// the middleware to the schema before compiling the model.</span>
schema.<span class="hljs-title function_">pre</span>(<span class="hljs-string">'save'</span>, <span class="hljs-function">() =&gt;</span> <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">'Hello from pre save'</span>));

<span class="hljs-comment">// Compile a model from the schema</span>
<span class="hljs-keyword">const</span> <span class="hljs-title class_">User</span> = mongoose.<span class="hljs-title function_">model</span>(<span class="hljs-string">'User'</span>, schema);

<span class="hljs-keyword">const</span> user = <span class="hljs-keyword">new</span> <span class="hljs-title class_">User</span>({ <span class="hljs-attr">name</span>: <span class="hljs-string">'test'</span> });
user.<span class="hljs-title function_">save</span>();
</code></pre>
<p>As a consequence, be careful about exporting Mongoose models from the same
file that you define your schema. If you choose to use this pattern, you
must define <a href="api/mongoose.html#mongoose_Mongoose-plugin">global plugins</a>
<strong>before</strong> calling <code>require()</code> on your model file.</p>
<pre><code class="language-javascript"><span class="hljs-keyword">const</span> schema = <span class="hljs-keyword">new</span> mongoose.<span class="hljs-title class_">Schema</span>({ <span class="hljs-attr">name</span>: <span class="hljs-title class_">String</span> });

<span class="hljs-comment">// Once you `require()` this file, you can no longer add any middleware</span>
<span class="hljs-comment">// to this schema.</span>
<span class="hljs-variable language_">module</span>.<span class="hljs-property">exports</span> = mongoose.<span class="hljs-title function_">model</span>(<span class="hljs-string">'User'</span>, schema);
</code></pre>
<h2 id="order"><a href="#order">Save/Validate Hooks</a></h2>

<p>The <code>save()</code> function triggers <code>validate()</code> hooks, because mongoose
has a built-in <code>pre('save')</code> hook that calls <code>validate()</code>. This means
that all <code>pre('validate')</code> and <code>post('validate')</code> hooks get called
<strong>before</strong> any <code>pre('save')</code> hooks.</p>
<pre><code class="language-javascript">schema.<span class="hljs-title function_">pre</span>(<span class="hljs-string">'validate'</span>, <span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) {
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">'this gets printed first'</span>);
});
schema.<span class="hljs-title function_">post</span>(<span class="hljs-string">'validate'</span>, <span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) {
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">'this gets printed second'</span>);
});
schema.<span class="hljs-title function_">pre</span>(<span class="hljs-string">'save'</span>, <span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) {
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">'this gets printed third'</span>);
});
schema.<span class="hljs-title function_">post</span>(<span class="hljs-string">'save'</span>, <span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) {
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">'this gets printed fourth'</span>);
});
</code></pre>
<h2 id="accessing-parameters-in-middleware"><a href="#accessing-parameters-in-middleware">Accessing Parameters in Middleware</a></h2>

<p>Mongoose provides 2 ways to get information about the function call that triggered the middleware.
For query middleware, we recommend using <code>this</code>, which will be a <a href="api/query.html">Mongoose Query instance</a>.</p>
<pre><code class="language-javascript"><span class="hljs-keyword">const</span> userSchema = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Schema</span>({ <span class="hljs-attr">name</span>: <span class="hljs-title class_">String</span>, <span class="hljs-attr">age</span>: <span class="hljs-title class_">Number</span> });
userSchema.<span class="hljs-title function_">pre</span>(<span class="hljs-string">'findOneAndUpdate'</span>, <span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) {
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-variable language_">this</span>.<span class="hljs-title function_">getFilter</span>()); <span class="hljs-comment">// { name: 'John' }</span>
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-variable language_">this</span>.<span class="hljs-title function_">getUpdate</span>()); <span class="hljs-comment">// { age: 30 }</span>
});
<span class="hljs-keyword">const</span> <span class="hljs-title class_">User</span> = mongoose.<span class="hljs-title function_">model</span>(<span class="hljs-string">'User'</span>, userSchema);

<span class="hljs-keyword">await</span> <span class="hljs-title class_">User</span>.<span class="hljs-title function_">findOneAndUpdate</span>({ <span class="hljs-attr">name</span>: <span class="hljs-string">'John'</span> }, { <span class="hljs-attr">$set</span>: { <span class="hljs-attr">age</span>: <span class="hljs-number">30</span> } });
</code></pre>
<p>For document middleware, like <code>pre('save')</code>, Mongoose passes the 1st parameter to <code>save()</code> as the 2nd argument to your <code>pre('save')</code> callback.
You should use the 2nd argument to get access to the <code>save()</code> call's <code>options</code>, because Mongoose documents don't store all the options you can pass to <code>save()</code>.</p>
<pre><code class="language-javascript"><span class="hljs-keyword">const</span> userSchema = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Schema</span>({ <span class="hljs-attr">name</span>: <span class="hljs-title class_">String</span>, <span class="hljs-attr">age</span>: <span class="hljs-title class_">Number</span> });
userSchema.<span class="hljs-title function_">pre</span>(<span class="hljs-string">'save'</span>, <span class="hljs-keyword">function</span>(<span class="hljs-params">next, options</span>) {
  options.<span class="hljs-property">validateModifiedOnly</span>; <span class="hljs-comment">// true</span>

  <span class="hljs-comment">// Remember to call `next()` unless you're using an async function or returning a promise</span>
  <span class="hljs-title function_">next</span>();
});
<span class="hljs-keyword">const</span> <span class="hljs-title class_">User</span> = mongoose.<span class="hljs-title function_">model</span>(<span class="hljs-string">'User'</span>, userSchema);

<span class="hljs-keyword">const</span> doc = <span class="hljs-keyword">new</span> <span class="hljs-title class_">User</span>({ <span class="hljs-attr">name</span>: <span class="hljs-string">'John'</span>, <span class="hljs-attr">age</span>: <span class="hljs-number">30</span> });
<span class="hljs-keyword">await</span> doc.<span class="hljs-title function_">save</span>({ <span class="hljs-attr">validateModifiedOnly</span>: <span class="hljs-literal">true</span> });
</code></pre>
<h2 id="naming"><a href="#naming">Naming Conflicts</a></h2>

<p>Mongoose has both query and document hooks for <code>deleteOne()</code>.</p>
<pre><code class="language-javascript">schema.<span class="hljs-title function_">pre</span>(<span class="hljs-string">'deleteOne'</span>, <span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) { <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">'Removing!'</span>); });

<span class="hljs-comment">// Does **not** print "Removing!". Document middleware for `remove` is not executed by default</span>
<span class="hljs-keyword">await</span> doc.<span class="hljs-title function_">deleteOne</span>();

<span class="hljs-comment">// Prints "Removing!"</span>
<span class="hljs-title class_">Model</span>.<span class="hljs-title function_">remove</span>();
</code></pre>
<p>You can pass options to <a href="api.html#schema_Schema-pre"><code>Schema.pre()</code></a>
and <a href="api.html#schema_Schema-post"><code>Schema.post()</code></a> to switch whether
Mongoose calls your <code>deleteOne()</code> hook for <a href="api/model.html#Model.prototype.deleteOne()"><code>Document.prototype.deleteOne()</code></a>
or <a href="api/query.html#Query.prototype.deleteOne()"><code>Query.prototype.deleteOne()</code></a>. Note here that you need to set both <code>document</code> and <code>query</code> properties in the passed object:</p>
<pre><code class="language-javascript"><span class="hljs-comment">// Only document middleware</span>
schema.<span class="hljs-title function_">pre</span>(<span class="hljs-string">'deleteOne'</span>, { <span class="hljs-attr">document</span>: <span class="hljs-literal">true</span>, <span class="hljs-attr">query</span>: <span class="hljs-literal">false</span> }, <span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) {
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">'Deleting doc!'</span>);
});

<span class="hljs-comment">// Only query middleware. This will get called when you do `Model.remove()`</span>
<span class="hljs-comment">// but not `doc.remove()`.</span>
schema.<span class="hljs-title function_">pre</span>(<span class="hljs-string">'deleteOne'</span>, { <span class="hljs-attr">query</span>: <span class="hljs-literal">true</span>, <span class="hljs-attr">document</span>: <span class="hljs-literal">false</span> }, <span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) {
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">'Deleting!'</span>);
});
</code></pre>
<p>Mongoose also has both query and document hooks for <code>validate()</code>.
Unlike <code>deleteOne</code> and <code>updateOne</code>, <code>validate</code> middleware applies to <code>Document.prototype.validate</code> by default.</p>
<pre><code class="language-javascript"><span class="hljs-keyword">const</span> schema = <span class="hljs-keyword">new</span> mongoose.<span class="hljs-title class_">Schema</span>({ <span class="hljs-attr">name</span>: <span class="hljs-title class_">String</span> });
schema.<span class="hljs-title function_">pre</span>(<span class="hljs-string">'validate'</span>, <span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) {
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">'Document validate'</span>);
});
schema.<span class="hljs-title function_">pre</span>(<span class="hljs-string">'validate'</span>, { <span class="hljs-attr">query</span>: <span class="hljs-literal">true</span>, <span class="hljs-attr">document</span>: <span class="hljs-literal">false</span> }, <span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) {
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">'Query validate'</span>);
});
<span class="hljs-keyword">const</span> <span class="hljs-title class_">Test</span> = mongoose.<span class="hljs-title function_">model</span>(<span class="hljs-string">'Test'</span>, schema);

<span class="hljs-keyword">const</span> doc = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Test</span>({ <span class="hljs-attr">name</span>: <span class="hljs-string">'foo'</span> });

<span class="hljs-comment">// Prints "Document validate"</span>
<span class="hljs-keyword">await</span> doc.<span class="hljs-title function_">validate</span>();

<span class="hljs-comment">// Prints "Query validate"</span>
<span class="hljs-keyword">await</span> <span class="hljs-title class_">Test</span>.<span class="hljs-title function_">find</span>().<span class="hljs-title function_">validate</span>();
</code></pre>
<h2 id="notes"><a href="#notes">Notes on findAndUpdate() and Query Middleware</a></h2>

<p>Pre and post <code>save()</code> hooks are <strong>not</strong> executed on <code>update()</code>,
<code>findOneAndUpdate()</code>, etc. You can see a more detailed discussion why in
<a href="http://github.com/Automattic/mongoose/issues/964">this GitHub issue</a>.
Mongoose 4.0 introduced distinct hooks for these functions.</p>
<pre><code class="language-javascript">schema.<span class="hljs-title function_">pre</span>(<span class="hljs-string">'find'</span>, <span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) {
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-variable language_">this</span> <span class="hljs-keyword">instanceof</span> mongoose.<span class="hljs-property">Query</span>); <span class="hljs-comment">// true</span>
  <span class="hljs-variable language_">this</span>.<span class="hljs-property">start</span> = <span class="hljs-title class_">Date</span>.<span class="hljs-title function_">now</span>();
});

schema.<span class="hljs-title function_">post</span>(<span class="hljs-string">'find'</span>, <span class="hljs-keyword">function</span>(<span class="hljs-params">result</span>) {
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-variable language_">this</span> <span class="hljs-keyword">instanceof</span> mongoose.<span class="hljs-property">Query</span>); <span class="hljs-comment">// true</span>
  <span class="hljs-comment">// prints returned documents</span>
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">'find() returned '</span> + <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>(result));
  <span class="hljs-comment">// prints number of milliseconds the query took</span>
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">'find() took '</span> + (<span class="hljs-title class_">Date</span>.<span class="hljs-title function_">now</span>() - <span class="hljs-variable language_">this</span>.<span class="hljs-property">start</span>) + <span class="hljs-string">' milliseconds'</span>);
});
</code></pre>
<p>Query middleware differs from document middleware in a subtle but
important way: in document middleware, <code>this</code> refers to the document
being updated. In query middleware, mongoose doesn't necessarily have
a reference to the document being updated, so <code>this</code> refers to the
<strong>query</strong> object rather than the document being updated.</p>
<p>For instance, if you wanted to add an <code>updatedAt</code> timestamp to every
<code>updateOne()</code> call, you would use the following pre hook.</p>
<pre><code class="language-javascript">schema.<span class="hljs-title function_">pre</span>(<span class="hljs-string">'updateOne'</span>, <span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) {
  <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">set</span>({ <span class="hljs-attr">updatedAt</span>: <span class="hljs-keyword">new</span> <span class="hljs-title class_">Date</span>() });
});
</code></pre>
<p>You <strong>cannot</strong> access the document being updated in <code>pre('updateOne')</code> or
<code>pre('findOneAndUpdate')</code> query middleware. If you need to access the document
that will be updated, you need to execute an explicit query for the document.</p>
<pre><code class="language-javascript">schema.<span class="hljs-title function_">pre</span>(<span class="hljs-string">'findOneAndUpdate'</span>, <span class="hljs-keyword">async</span> <span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> docToUpdate = <span class="hljs-keyword">await</span> <span class="hljs-variable language_">this</span>.<span class="hljs-property">model</span>.<span class="hljs-title function_">findOne</span>(<span class="hljs-variable language_">this</span>.<span class="hljs-title function_">getQuery</span>());
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(docToUpdate); <span class="hljs-comment">// The document that `findOneAndUpdate()` will modify</span>
});
</code></pre>
<p>However, if you define <code>pre('updateOne')</code> document middleware,
<code>this</code> will be the document being updated. That's because <code>pre('updateOne')</code>
document middleware hooks into <a href="api/document.html#document_Document-updateOne"><code>Document#updateOne()</code></a>
rather than <code>Query#updateOne()</code>.</p>
<pre><code class="language-javascript">schema.<span class="hljs-title function_">pre</span>(<span class="hljs-string">'updateOne'</span>, { <span class="hljs-attr">document</span>: <span class="hljs-literal">true</span>, <span class="hljs-attr">query</span>: <span class="hljs-literal">false</span> }, <span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) {
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">'Updating'</span>);
});
<span class="hljs-keyword">const</span> <span class="hljs-title class_">Model</span> = mongoose.<span class="hljs-title function_">model</span>(<span class="hljs-string">'Test'</span>, schema);

<span class="hljs-keyword">const</span> doc = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Model</span>();
<span class="hljs-keyword">await</span> doc.<span class="hljs-title function_">updateOne</span>({ <span class="hljs-attr">$set</span>: { <span class="hljs-attr">name</span>: <span class="hljs-string">'test'</span> } }); <span class="hljs-comment">// Prints "Updating"</span>

<span class="hljs-comment">// Doesn't print "Updating", because `Query#updateOne()` doesn't fire</span>
<span class="hljs-comment">// document middleware.</span>
<span class="hljs-keyword">await</span> <span class="hljs-title class_">Model</span>.<span class="hljs-title function_">updateOne</span>({}, { <span class="hljs-attr">$set</span>: { <span class="hljs-attr">name</span>: <span class="hljs-string">'test'</span> } });
</code></pre>
<h2 id="error-handling-middleware"><a href="#error-handling-middleware">Error Handling Middleware</a></h2>

<p>Middleware execution normally stops the first time a piece of middleware
calls <code>next()</code> with an error. However, there is a special kind of post
middleware called "error handling middleware" that executes specifically
when an error occurs. Error handling middleware is useful for reporting
errors and making error messages more readable.</p>
<p>Error handling middleware is defined as middleware that takes one extra
parameter: the 'error' that occurred as the first parameter to the function.
Error handling middleware can then transform the error however you want.</p>
<pre><code class="language-javascript"><span class="hljs-keyword">const</span> schema = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Schema</span>({
  <span class="hljs-attr">name</span>: {
    <span class="hljs-attr">type</span>: <span class="hljs-title class_">String</span>,
    <span class="hljs-comment">// Will trigger a MongoServerError with code 11000 when</span>
    <span class="hljs-comment">// you save a duplicate</span>
    <span class="hljs-attr">unique</span>: <span class="hljs-literal">true</span>
  }
});

<span class="hljs-comment">// Handler **must** take 3 parameters: the error that occurred, the document</span>
<span class="hljs-comment">// in question, and the `next()` function</span>
schema.<span class="hljs-title function_">post</span>(<span class="hljs-string">'save'</span>, <span class="hljs-keyword">function</span>(<span class="hljs-params">error, doc, next</span>) {
  <span class="hljs-keyword">if</span> (error.<span class="hljs-property">name</span> === <span class="hljs-string">'MongoServerError'</span> &amp;&amp; error.<span class="hljs-property">code</span> === <span class="hljs-number">11000</span>) {
    <span class="hljs-title function_">next</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">'There was a duplicate key error'</span>));
  } <span class="hljs-keyword">else</span> {
    <span class="hljs-title function_">next</span>();
  }
});

<span class="hljs-comment">// Will trigger the `post('save')` error handler</span>
<span class="hljs-title class_">Person</span>.<span class="hljs-title function_">create</span>([{ <span class="hljs-attr">name</span>: <span class="hljs-string">'Axl Rose'</span> }, { <span class="hljs-attr">name</span>: <span class="hljs-string">'Axl Rose'</span> }]);
</code></pre>
<p>Error handling middleware also works with query middleware. You can
also define a post <code>update()</code> hook that will catch MongoDB duplicate key
errors.</p>
<pre><code class="language-javascript"><span class="hljs-comment">// The same E11000 error can occur when you call `updateOne()`</span>
<span class="hljs-comment">// This function **must** take 4 parameters.</span>

schema.<span class="hljs-title function_">post</span>(<span class="hljs-string">'updateOne'</span>, <span class="hljs-keyword">function</span>(<span class="hljs-params">passRawResult, error, res, next</span>) {
  <span class="hljs-keyword">if</span> (error.<span class="hljs-property">name</span> === <span class="hljs-string">'MongoServerError'</span> &amp;&amp; error.<span class="hljs-property">code</span> === <span class="hljs-number">11000</span>) {
    <span class="hljs-title function_">next</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">'There was a duplicate key error'</span>));
  } <span class="hljs-keyword">else</span> {
    <span class="hljs-title function_">next</span>(); <span class="hljs-comment">// The `updateOne()` call will still error out.</span>
  }
});

<span class="hljs-keyword">const</span> people = [{ <span class="hljs-attr">name</span>: <span class="hljs-string">'Axl Rose'</span> }, { <span class="hljs-attr">name</span>: <span class="hljs-string">'Slash'</span> }];
<span class="hljs-keyword">await</span> <span class="hljs-title class_">Person</span>.<span class="hljs-title function_">create</span>(people);

<span class="hljs-comment">// Throws "There was a duplicate key error"</span>
<span class="hljs-keyword">await</span> <span class="hljs-title class_">Person</span>.<span class="hljs-title function_">updateOne</span>({ <span class="hljs-attr">name</span>: <span class="hljs-string">'Slash'</span> }, { <span class="hljs-attr">$set</span>: { <span class="hljs-attr">name</span>: <span class="hljs-string">'Axl Rose'</span> } });
</code></pre>
<p>Error handling middleware can transform an error, but it can't remove the
error. Even if you call <code>next()</code> with no error as shown above, the
function call will still error out.</p>
<h2 id="aggregate"><a href="#aggregate">Aggregation Hooks</a></h2>

<p>You can also define hooks for the <a href="api/model.html#model_Model-aggregate"><code>Model.aggregate()</code> function</a>.
In aggregation middleware functions, <code>this</code> refers to the <a href="api/aggregate.html#Aggregate">Mongoose <code>Aggregate</code> object</a>.
For example, suppose you're implementing soft deletes on a <code>Customer</code> model
by adding an <code>isDeleted</code> property. To make sure <code>aggregate()</code> calls only look
at customers that aren't soft deleted, you can use the below middleware to
add a <a href="api/aggregate.html#aggregate_Aggregate-match"><code>$match</code> stage</a> to the beginning
of each <a href="https://www.mongodb.com/docs/manual/core/aggregation-pipeline/">aggregation pipeline</a>.</p>
<pre><code class="language-javascript">customerSchema.<span class="hljs-title function_">pre</span>(<span class="hljs-string">'aggregate'</span>, <span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) {
  <span class="hljs-comment">// Add a $match state to the beginning of each pipeline.</span>
  <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">pipeline</span>().<span class="hljs-title function_">unshift</span>({ <span class="hljs-attr">$match</span>: { <span class="hljs-attr">isDeleted</span>: { <span class="hljs-attr">$ne</span>: <span class="hljs-literal">true</span> } } });
});
</code></pre>
<p>The <a href="api/aggregate.html#aggregate_Aggregate-pipeline"><code>Aggregate#pipeline()</code> function</a>
lets you access the MongoDB aggregation pipeline that Mongoose will send to
the MongoDB server. It is useful for adding stages to the beginning of the
pipeline from middleware.</p>
<h2 id="synchronous"><a href="#synchronous">Synchronous Hooks</a></h2>

<p>Certain Mongoose hooks are synchronous, which means they do <strong>not</strong> support
functions that return promises or receive a <code>next()</code> callback. Currently,
only <code>init</code> hooks are synchronous, because the <a href="api/document.html#document_Document-init"><code>init()</code> function</a>
is synchronous. Below is an example of using pre and post init hooks.</p>
<pre><code class="language-javascript">[<span class="hljs-attr">require</span>:post init hooks.*success]
</code></pre>
<p>To report an error in an init hook, you must throw a <strong>synchronous</strong> error.
Unlike all other middleware, init middleware does <strong>not</strong> handle promise
rejections.</p>
<pre><code class="language-javascript">[<span class="hljs-attr">require</span>:post init hooks.*error]
</code></pre>
<h2 id="next">Next Up</h2>

<p>Now that we've covered middleware, let's take a look at Mongoose's approach
to faking JOINs with its query <a href="populate.html">population</a> helper.</p>
</div>