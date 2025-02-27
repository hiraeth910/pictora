import  { useEffect, useState, useRef } from "react";
import { 
  Button, Card, Col, Row, Modal, Form, Input, Checkbox, notification, Spin 
} from "antd";
import { 
  LogoutOutlined, ArrowLeftOutlined, DeleteOutlined, DownloadOutlined 
} from "@ant-design/icons";
import { 
  getWithdrawalHistory, getBankAccounts, 
  submitBankDetails, deleteBankAccount 
} from "../utils/getapi";
import useAuthStore from "../store";
// Dashboard component – main page that toggles between menu, transactions, and banks
export const Dashboar = () => {
  const username = localStorage.getItem("username") || "User";

  // view: "menu" | "transactions" | "banks"
  const [view, setView] = useState("menu");

  // Transactions state
  const [transactions, setTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loadingTransactions, setLoadingTransactions] = useState(false);
  const [hasMoreTransactions, setHasMoreTransactions] = useState(true);

  // Banks state
  const [banks, setBanks] = useState([]);
  const [loadingBanks, setLoadingBanks] = useState(false);
  const [bankModalVisible, setBankModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [bankToDelete, setBankToDelete] = useState(null);
  const [bankForm] = Form.useForm();

  // Ref for the transactions scroll container (if needed)
  const transactionsContainerRef = useRef(null);
  const lout = useAuthStore((state)=>state.logout)
  // When view changes, load the corresponding data.
  useEffect(() => {
    if (view === "transactions") {
      setTransactions([]);
      setCurrentPage(1);
      setHasMoreTransactions(true);
      fetchTransactions(1);
    }
    if (view === "banks") {
      fetchBanks();
    }
  }, [view]);

  // Fetch transactions page by page
  const fetchTransactions = async (page) => {
    setLoadingTransactions(true);
    try {
      const data = await getWithdrawalHistory(page);
      if (data.error) {
        notification.error({
          message: "Error fetching transactions",
          description: data.error,
        });
      } else {
        if (data.length === 0) {
          setHasMoreTransactions(false);
        } else {
          setTransactions((prev) => [...prev, ...data]);
        }
      }
    } catch (err) {
      notification.error({
        message: "Error fetching transactions",
        description: err.toString(),
      });
    }
    setLoadingTransactions(false);
  };

  // Infinite scroll handler for transactions view
  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollTop + clientHeight >= scrollHeight - 5 && !loadingTransactions && hasMoreTransactions) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      fetchTransactions(nextPage);
    }
  };

  // Fetch banks from API
  const fetchBanks = async () => {
    setLoadingBanks(true);
    try {
      const data = await getBankAccounts();
      if (data.error) {
        notification.error({
          message: "Error fetching banks",
          description: data.error,
        });
      } else {
        setBanks(data || []);
      }
    } catch (err) {
      notification.error({
        message: "Error fetching banks",
        description: err.toString(),
      });
    }
    setLoadingBanks(false);
  };

  // Delete bank account
  const handleDeleteBank = async () => {
    if (!bankToDelete) return;
    try {
      const res = await deleteBankAccount(bankToDelete.textid);
      if (res.error) {
        notification.error({
          message: "Error deleting bank",
          description: res.error,
        });
      } else {
        notification.success({ message: "Bank deleted successfully" });
        fetchBanks();
      }
    } catch (err) {
              fetchBanks();
      notification.error({
        message: "Error deleting bank",
        description: err.toString(),
      });
    }
    setDeleteModalVisible(false);
  };

  // Add new bank
  const handleAddBank = async (values) => {
    if (values.acno !== values.reacno) {
      notification.error({ message: "Account numbers do not match" });
      return;
    }
    
    const { reacno, ...bankData } = values;
    try {
      console.log(reacno)
      const res = await submitBankDetails(bankData);
      if (res.error) {
        notification.error({
          message: "Error adding bank",
          description: res.error,
        });
      } else {
        notification.success({ message: "Bank added successfully" });
        fetchBanks();
        setBankModalVisible(false);
        bankForm.resetFields();
      }
    } catch (err) {
      notification.error({
        message: "Error adding bank",
        description: err.toString(),
      });
    }
  };

  // Logout function
  const handleLogout = () => {
    lout()
    localStorage.removeItem("providerToken");
    localStorage.removeItem("username");
    window.location.reload();
  };

  // Render the main menu with greeting and options
  const renderMenu = () => (
    <div style={{ textAlign: "center", padding: 20 }}>
      <h2>Hello, {username}</h2>
      <Button
        type="primary"
        block
        style={{ marginBottom: 10 }}
        onClick={() => setView("transactions")}
      >
        Withdrawal History
      </Button>
      <Button
        type="primary"
        block
        style={{ marginBottom: 10 }}
        onClick={() => setView("banks")}
      >
        Banks
      </Button>
      <Button type="default" block icon={<LogoutOutlined />} onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );

  // Render transactions view with infinite scroll
  const renderTransactions = () => (
    <div
      style={{ padding: 20, height: "80vh", overflowY: "auto" }}
      onScroll={handleScroll}
      ref={transactionsContainerRef}
    >
      <Button
        icon={<ArrowLeftOutlined />}
        onClick={() => setView("menu")}
        style={{ marginBottom: 20 }}
      >
        Back to Menu
      </Button>
      <Row gutter={[16, 16]}>
        {transactions.map((tx) => (
          <Col key={tx.transactionid} xs={24} sm={24} md={12}>
            <Card
              title={
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <span>
                    {tx.status === "success"
                      ? "✅"
                      : tx.status === "failed"
                      ? "❌"
                      : "⚠️"}
                  </span>
                  <span style={{ fontWeight: "bold" }}>{tx.transactionid}</span>
                </div>
              }
              extra={
                tx.status === "success" && (
                  <DownloadOutlined
                    style={{ fontSize: 20, color: "#1890ff", cursor: "pointer" }}
                  />
                )
              }
            >
              <p>
                <strong>AcNo:</strong> {tx.acno}
              </p>
              <p>
                <strong>Amount:</strong> ${tx.withdrawl_amount}
              </p>
              <p>
                <strong>Date:</strong> {tx.tmstmp}
              </p>
            </Card>
          </Col>
        ))}
      </Row>
      {loadingTransactions && (
        <div style={{ textAlign: "center", padding: 20 }}>
          <Spin />
        </div>
      )}
      {!hasMoreTransactions && (
        <div style={{ textAlign: "center", padding: 20 }}>
          <strong>End of the list</strong>
        </div>
      )}
    </div>
  );

  // Render banks view with delete and add bank functionality
  const renderBanks = () => (
    <div style={{ padding: 20 }}>
      <Button
        icon={<ArrowLeftOutlined />}
        onClick={() => setView("menu")}
        style={{ marginBottom: 20 }}
      >
        Back to Menu
      </Button>
      {loadingBanks ? (
        <Spin />
      ) : (
        <>
          <Row gutter={[16, 16]} justify="center">
            {banks.map((bank) => (
              <Col key={bank.textId} xs={24} sm={12} md={12}>
                <Card
                  title={bank.bank}
                  extra={
                    <Button
                      type="link"
                      icon={<DeleteOutlined />}
                      danger
                      onClick={() => {
                        setBankToDelete(bank);
                        setDeleteModalVisible(true);
                      }}
                    />
                  }
                >
                  <p>
                    <strong>Banking Name:</strong> {bank.bankingname}
                  </p>
                  <p>
                    <strong>Account No:</strong> {bank.acno}
                  </p>
                  <p>
                    <strong>IFSC:</strong> {bank.ifsc}
                  </p>
                </Card>
              </Col>
            ))}
          </Row>
          <div style={{ textAlign: "center", marginTop: 20 }}>
            <Button
              type="primary"
              onClick={() => {
                if (banks.length >= 2) {
                  notification.warning({
                    message: "Please delete an existing bank to add a new one",
                  });
                } else {
                  setBankModalVisible(true);
                }
              }}
            >
              Add Bank
            </Button>
          </div>
        </>
      )}
    </div>
  );

  return (
    <div>
      {view === "menu" && renderMenu()}
      {view === "transactions" && renderTransactions()}
      {view === "banks" && renderBanks()}

      {/* Delete confirmation modal */}
      <Modal
        title="Confirm Deletion"
        open={deleteModalVisible}
        onOk={handleDeleteBank}
        onCancel={() => setDeleteModalVisible(false)}
      >
        <p>Are you sure you want to delete this bank account?</p>
      </Modal>

      {/* Add Bank modal */}
      <Modal
        title="Add Bank Account"
        visible={bankModalVisible}
        onCancel={() => setBankModalVisible(false)}
        footer={null}
      >
        <Form layout="vertical" form={bankForm} onFinish={handleAddBank}>
          <Form.Item
            label="Bank Name"
            name="bank"
            rules={[{ required: true, message: "Please enter the bank name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Banking Name"
            name="bankingname"
            rules={[{ required: true, message: "Please enter the banking name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Account Number"
            name="acno"
            rules={[{ required: true, message: "Please enter the account number" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Re-enter Account Number"
            name="reacno"
            rules={[{ required: true, message: "Please re-enter the account number" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="IFSC"
            name="ifsc"
            rules={[{ required: true, message: "Please enter the IFSC code" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="confirm"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value ? Promise.resolve() : Promise.reject("You must confirm that the bank account is accurate"),
              },
            ]}
          >
            <Checkbox>
              I rechecked the bank account and it is accurate.
            </Checkbox>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
