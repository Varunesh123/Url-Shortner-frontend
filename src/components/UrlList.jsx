import PropTypes from "prop-types";

const UrlList = ({ urls }) => {
  return (
    <div className="mt-4">
      <h2 className="text-xl font-bold">Your Shortened URLs</h2>
      <ul className="mt-2 space-y-2">
        {urls.length === 0 ? (
          <p>No URLs created yet.</p>
        ) : (
          urls.map((url) => (
            <li key={url.shortUrl} className="border p-2 rounded bg-gray-100">
              <div className="flex justify-between items-center">
                <a
                  href={url.shortUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  {url.shortUrl}
                </a>
                <span className="text-sm text-gray-600">
                  Clicks: {url.totalClicks || 0}
                </span>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

UrlList.propTypes = {
  urls: PropTypes.array.isRequired,
};

export default UrlList;
