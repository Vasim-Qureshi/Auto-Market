import React from 'react';

const BlogSection = () => (
  <section className="container py-5">
    <h4>Latest from Blog</h4>
    <div className="row mt-3">
      {[1,2].map(i => (
        <div className="col-md-6" key={i}>
          <div className="card p-3 mb-3">
            <h5>Blog Title {i}</h5>
            <p className="small">Learn more about buying & selling vehicles smartly.</p>
            <a href="#" className="stretched-link">Read More</a>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default BlogSection;
