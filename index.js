import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// To render the homepage with all the blog posts

app.get('/', (req, res) => {
    res.render("index.ejs", {blogs: blogs,
      date: getDate(),
    });
  });

// To render the edit page by taking the post id and displaying its content, author, and title in the edit form

  app.get('/edit/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const blog = blogs.find((b) => b.id === id);
  res.render("edit.ejs", { blog: blog,
    heading: "Edit your blog",
  });
})

// To redirect to the homepage after parsing the edits made in the edit form

app.post('/edited-post/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const blogIndex = blogs.findIndex((b) => b.id === id);
  if (blogIndex === -1) {
    res.status(404).send("Blog not found.");
  } else {
    const editedBlog = {
      id: id,
      title: req.body.title,
      date: getDate(),
      author: req.body.author,
      content: req.body.content,
    }
    blogs[blogIndex] = editedBlog;
    res.redirect('/');
  }
});

// To delete a blog by parsing its id

app.get('/delete/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const blogIndex = blogs.findIndex((b) => b.id === id);
  if (blogIndex === -1) {
    res.status(400).send("Blog not found.")
  } else {
    blogs.splice(blogIndex, 1);
    res.redirect('/');
  }
})

// To render only one post when clicked on its title by parsing its id on the /posts/:id route

app.get('/posts/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const blogPost = blogs.find((b) => b.id === id);
  res.render('index.ejs', {blogs: [blogPost]});
})

// To make a new post -- render the empty edit form

app.get('/new', (req, res) => {
  res.render('edit.ejs', {heading: "Make a new blog post"});
})

// To add the new post to the blog list/array/website

app.post('/new-post', (req, res) => {
  const newBlog = {
    id: blogs.length + 1,
    title: req.body.title,
    date: getDate(),
    author: req.body.author,
    content: req.body.content,
  }
  blogs.push(newBlog);
  res.redirect('/');
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });

function getDate() {
  const today = new Date;
  const formatOptions = { day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }
  const formatter = new Intl.DateTimeFormat('en-US', formatOptions);
  const formattedDate = formatter.format(today);
  return formattedDate;
}
const blogs = [
  {
    id: 1,
    title: "What do you do when you don't really do anything?",
    date: getDate(),
    author: "AA",
    content: 
    "Nulla ac augue quis erat hendrerit aliquam. Donec varius justo in magna eleifend, quis tempor nisi posuere. Sed vehicula odio non lectus commodo ullamcorper. Quisque accumsan posuere ex, vehicula sagittis nibh dapibus a. Nunc quis urna nec urna ultrices gravida ut imperdiet urna. Vivamus eros magna, egestas vel arcu sit amet, consequat ultricies quam. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Maecenas pellentesque nisi purus, id suscipit magna luctus ut. In placerat sed nisl iaculis efficitur. Nulla malesuada mattis dolor et auctor. Nam vehicula mauris nulla, ut laoreet ligula consequat ac. Aliquam sed velit id metus convallis sagittis et in felis. Sed eleifend aliquam metus, sit amet hendrerit metus ultricies non. Proin ipsum urna, aliquet lacinia urna rhoncus, finibus laoreet elit. Donec venenatis nisl porta, fermentum quam vel, finibus justo. Vestibulum ut nulla scelerisque, blandit risus vitae, scelerisque odio. Praesent lorem nisi, dictum et aliquam id, facilisis sed sem. Etiam non odio a leo accumsan feugiat. Aenean et nibh sodales, consequat mauris ac, feugiat nisi. Cras vel lorem elit. Interdum et malesuada fames ac ante ipsum primis in faucibus. Maecenas vel vulputate lacus, vitae consectetur justo. Maecenas suscipit, magna id placerat accumsan, erat augue mattis leo, eget mollis sapien mauris sit amet elit. Suspendisse gravida consequat sem. Mauris a condimentum nisl, sed ultricies lorem. Mauris posuere orci eu odio sollicitudin gravida. Pellentesque finibus ipsum a justo maximus vulputate. Sed porta est et purus pulvinar, et volutpat felis sodales. Nunc consequat enim ante, et lobortis ex fermentum nec. Fusce mi lorem, euismod sit amet ligula vitae, congue laoreet tellus. Mauris risus felis, pharetra a arcu sit amet, tristique vehicula ex."
  },

  {
    id: 2,
    title: "What happens to those who ignore every happening in their life?",
    date: getDate(),
    author: "AB",
    content: 
    "Nulla ac augue quis erat hendrerit aliquam. Donec varius justo in magna eleifend, quis tempor nisi posuere. Sed vehicula odio non lectus commodo ullamcorper. Quisque accumsan posuere ex, vehicula sagittis nibh dapibus a. Nunc quis urna nec urna ultrices gravida ut imperdiet urna. Vivamus eros magna, egestas vel arcu sit amet, consequat ultricies quam. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Maecenas pellentesque nisi purus, id suscipit magna luctus ut. In placerat sed nisl iaculis efficitur. Nulla malesuada mattis dolor et auctor. Nam vehicula mauris nulla, ut laoreet ligula consequat ac. Aliquam sed velit id metus convallis sagittis et in felis. Sed eleifend aliquam metus, sit amet hendrerit metus ultricies non.<br>Proin ipsum urna, aliquet lacinia urna rhoncus, finibus laoreet elit. Donec venenatis nisl porta, fermentum quam vel, finibus justo. Vestibulum ut nulla scelerisque, blandit risus vitae, scelerisque odio. Praesent lorem nisi, dictum et aliquam id, facilisis sed sem. Etiam non odio a leo accumsan feugiat. Aenean et nibh sodales, consequat mauris ac, feugiat nisi. Cras vel lorem elit. Interdum et malesuada fames ac ante ipsum primis in faucibus. Maecenas vel vulputate lacus, vitae consectetur justo. Maecenas suscipit, magna id placerat accumsan, erat augue mattis leo, eget mollis sapien mauris sit amet elit. Suspendisse gravida consequat sem. Mauris a condimentum nisl, sed ultricies lorem. Mauris posuere orci eu odio sollicitudin gravida. Pellentesque finibus ipsum a justo maximus vulputate. Sed porta est et purus pulvinar, et volutpat felis sodales. Nunc consequat enim ante, et lobortis ex fermentum nec. Fusce mi lorem, euismod sit amet ligula vitae, congue laoreet tellus. Mauris risus felis, pharetra a arcu sit amet, tristique vehicula ex."
  },

  {
    id: 3,
    title: "What can be the answer to a riddle that hasn't yet been written?",
    date: getDate(),
    author: "AC",
    content: 
    "Nulla ac augue quis erat hendrerit aliquam. Donec varius justo in magna eleifend, quis tempor nisi posuere. Sed vehicula odio non lectus commodo ullamcorper. Quisque accumsan posuere ex, vehicula sagittis nibh dapibus a. Nunc quis urna nec urna ultrices gravida ut imperdiet urna. Vivamus eros magna, egestas vel arcu sit amet, consequat ultricies quam. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Maecenas pellentesque nisi purus, id suscipit magna luctus ut. In placerat sed nisl iaculis efficitur. Nulla malesuada mattis dolor et auctor. Nam vehicula mauris nulla, ut laoreet ligula consequat ac. Aliquam sed velit id metus convallis sagittis et in felis. Sed eleifend aliquam metus, sit amet hendrerit metus ultricies non. Proin ipsum urna, aliquet lacinia urna rhoncus, finibus laoreet elit. Donec venenatis nisl porta, fermentum quam vel, finibus justo. Vestibulum ut nulla scelerisque, blandit risus vitae, scelerisque odio. Praesent lorem nisi, dictum et aliquam id, facilisis sed sem. Etiam non odio a leo accumsan feugiat. Aenean et nibh sodales, consequat mauris ac, feugiat nisi. Cras vel lorem elit. Interdum et malesuada fames ac ante ipsum primis in faucibus. Maecenas vel vulputate lacus, vitae consectetur justo. Maecenas suscipit, magna id placerat accumsan, erat augue mattis leo, eget mollis sapien mauris sit amet elit. Suspendisse gravida consequat sem. Mauris a condimentum nisl, sed ultricies lorem. Mauris posuere orci eu odio sollicitudin gravida. Pellentesque finibus ipsum a justo maximus vulputate. Sed porta est et purus pulvinar, et volutpat felis sodales. Nunc consequat enim ante, et lobortis ex fermentum nec. Fusce mi lorem, euismod sit amet ligula vitae, congue laoreet tellus. Mauris risus felis, pharetra a arcu sit amet, tristique vehicula ex."
  },
];
  