import styles from "./skipToContent.module.css";

export function SkipToContent() {
  return (
    <div className={styles.skip}>
      <a href="#main" className={styles.link}>
        <span>Skip to main content</span>
        <span className={styles.svg}>
          <svg width="26" height="27" xmlns="http://www.w3.org/2000/svg">
            <g fill="none" fillRule="evenodd">
              <path
                d="M4.498 24.3v-.872H1.5v-1.37h2.716v-.872H1.5v-1.27h3v-.872H.542V24.3h3.955zm1.909 0v-3.695L9.183 24.3h.95v-5.256h-.95v3.695l-2.776-3.695H5.45V24.3h.957zm7.21 0v-4.383h1.682v-.873h-4.314v.873h1.683V24.3h.948zm6.421 0v-.872H17.04v-1.37h2.716v-.872H17.04v-1.27h3v-.872h-3.956V24.3h3.955zm1.84 0v-1.767h1.017l1.24 1.767h1.086l-1.316-1.867c.757-.237 1.27-.849 1.27-1.644 0-1.025-.842-1.745-1.966-1.745H20.92V24.3h.957zm1.224-2.647h-1.224v-1.729h1.224c.65 0 1.101.33 1.101.865 0 .535-.451.864-1.101.864z"
                fill="#000"
                fillRule="nonzero"
              ></path>
              <path
                fill="none"
                d="M18.9 1v6.3a2.7 2.7 0 01-2.7 2.7H5.4h0"
                stroke="#000"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
              <path
                fill="none"
                stroke="#000"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.1 12.7L5.4 10l2.7-2.7"
              ></path>
            </g>
          </svg>
        </span>
      </a>
    </div>
  );
}
