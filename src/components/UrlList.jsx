import PropTypes from "prop-types";

const UrlList = ({ urls }) => {
  console.log("urls:", urls)
  return (
    <div className="mt-4">
      <h2 className="text-xl font-bold">Your Shortened URLs</h2>
      <ul className="mt-2 space-y-2">
        {urls.length === 0 ? (
          <p>No URLs created yet.</p>
        ) : (
          urls.map((url, index) => (
            <li key={index} className="border p-2 rounded bg-gray-100">
              <div className="flex justify-between items-center space-x-4">
                <div className="bg-blue-100 p-3 rounded-md flex-1">
                  <a
                    href={url.shortUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    {url.shortUrl}
                  </a>
                </div>
                <div className="bg-gray-100 p-2 rounded-md text-sm text-gray-600">
                  Clicks: {url.totalClicks || 0}
                </div>
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
