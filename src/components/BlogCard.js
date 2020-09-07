import React from "react";
import { Card } from "react-bootstrap";
import Moment from "react-moment";

const defaultImg =
  "https://ctl.s6img.com/society6/img/4kb9ilHPKiXA4LJ8Wkq_KoYFzcI/w_700/prints/~artwork/s6-original-art-uploads/society6/uploads/misc/96e39609635b420c8bbad2baba50778e/~~/travel-quote-definition-prints.jpg";

const BlogCard = ({ handleClick, blog }) => {
  const avatar =
    blog.image && blog.images.length !== 0 ? blog.images[0].url : defaultImg;

  return (
    <Card onClick={() => handleClick(blog._id)}>
      <Card.Img variant="top" src={avatar} alt="..." />
      <Card.Body>
        <Card.Title className="style-title">{blog.title}</Card.Title>
        <Card.Text className="style-content">
          {blog.content.length <= 99
            ? blog.content
            : blog.content.slice(0, 99) + "..."}
        </Card.Text>
      </Card.Body>
      <Card.Footer>
        <small className="text-muted">
          {" "}
          <Moment fromNow>{blog.updatedAt}</Moment>
        </small>
      </Card.Footer>
    </Card>
  );
};

export default BlogCard;
