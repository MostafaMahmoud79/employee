import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const EmpEdit = () => {
  const { empid } = useParams();
  const [empdata, empdatachange] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:8000/employee/${empid}`)
      .then((res) => res.json())
      .then((resp) => {
        empdatachange(resp);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error:", err.message);
        setError(`Unable to load employee data: ${err.message}`);
        setLoading(false);
      });
  }, [empid]);

  const handlesubmit = (e) => {
    e.preventDefault();

    const updatedData = {
      id: empdata.id,
      name: empdata.name,
      email: empdata.email,
      phone: empdata.phone,
      isactive: empdata.isactive,
    };

    console.log("Updating employee:", updatedData);

    fetch(`http://localhost:8000/employee/${empid}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to update. Status: ${res.status}`);
        }
        alert("Saved successfully.");
        navigate("/");
      })
      .catch((err) => {
        console.error("Error:", err.message);
        alert(`Error: ${err.message}`);
      });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div className="row">
      <div className="offset-lg-3 col-lg-6">
        <form className="container" onSubmit={handlesubmit}>
          <div className="card" style={{ textAlign: "left" }}>
            <div className="card-title">
              <h2>Employee Edit</h2>
            </div>
            <div className="card-body">
              <div className="form-group">
                <label>ID</label>
                <input
                  value={empdata.id || ""}
                  disabled
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label>Name</label>
                <input
                  value={empdata.name || ""}
                  onChange={(e) =>
                    empdatachange({ ...empdata, name: e.target.value })
                  }
                  className="form-control"
                  required
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  value={empdata.email || ""}
                  onChange={(e) =>
                    empdatachange({ ...empdata, email: e.target.value })
                  }
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label>Phone</label>
                <input
                  value={empdata.phone || ""}
                  onChange={(e) =>
                    empdatachange({ ...empdata, phone: e.target.value })
                  }
                  className="form-control"
                />
              </div>
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  checked={empdata.isactive || false}
                  onChange={(e) =>
                    empdatachange({ ...empdata, isactive: e.target.checked })
                  }
                />
                <label className="form-check-label">Is Active</label>
              </div>
              <div className="form-group">
                <button className="btn btn-success" type="submit">
                  Save
                </button>
                <Link to="/" className="btn btn-danger">
                  Back
                </Link>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmpEdit;
