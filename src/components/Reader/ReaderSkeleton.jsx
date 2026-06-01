import './ReaderSkeleton.css'

function ReaderSkeleton() {
  return (
    <div className="rs-skeleton" aria-busy="true" aria-label="Loading article">
      <div className="rs-skeleton__byline" />
      <div className="rs-skeleton__title-line rs-skeleton__title-line--1" />
      <div className="rs-skeleton__title-line rs-skeleton__title-line--2" />
      <div className="rs-skeleton__subhead" />
      <div className="rs-skeleton__rule" />
      <div className="rs-skeleton__body">
        <div className="rs-skeleton__line" style={{ width: '100%' }} />
        <div className="rs-skeleton__line" style={{ width: '92%' }} />
        <div className="rs-skeleton__line" style={{ width: '96%' }} />
        <div className="rs-skeleton__line" style={{ width: '88%' }} />
        <div className="rs-skeleton__line" style={{ width: '94%' }} />
        <div className="rs-skeleton__line" style={{ width: '60%' }} />
      </div>
      <div className="rs-skeleton__body">
        <div className="rs-skeleton__line" style={{ width: '98%' }} />
        <div className="rs-skeleton__line" style={{ width: '90%' }} />
        <div className="rs-skeleton__line" style={{ width: '85%' }} />
        <div className="rs-skeleton__line" style={{ width: '70%' }} />
      </div>
    </div>
  )
}

export default ReaderSkeleton