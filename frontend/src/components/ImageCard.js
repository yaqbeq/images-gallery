import { Card, Button } from 'react-bootstrap';

const ImageCard = ({ image, deleteImage, saveImage }) => {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={image.urls.small} />
      <Card.Body>
        <Card.Title>{image.title?.toUpperCase()}</Card.Title>
        <Card.Text>{image.description || image.alt_description}</Card.Text>
        <Button variant="primary" onClick={() => deleteImage(image.id)}>
          Delete
        </Button>{' '}
        {!image.saved && (
          <Button variant="secondary" onClick={() => saveImage(image.id)}>
            Save
          </Button>
        )}
      </Card.Body>
      <Card.Footer className="text-muted text-center">
        Author: {image.user.name ? image.user.name : 'No author name'}
        <br />
        {image.user.portfolio_url && (
          <Card.Link href={image.user.portfolio_url} target="_blank">
            View Author Portfolio
          </Card.Link>
        )}
      </Card.Footer>
    </Card>
  );
};

export default ImageCard;
