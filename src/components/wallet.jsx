import  { useEffect, useState } from "react";
import { Button, Input, Select, Checkbox, Form, notification, Card, Typography, Spin } from "antd";
import { getBalance, getBankAccounts, raiseWithdrawal } from "../utils/getapi";

const WalletWithdrawal = () => {
  const [balance, setBalance] = useState(0);
  const [banks, setBanks] = useState([]);
  const [selectedBank, setSelectedBank] = useState(null);
  const [amount, setAmount] = useState("");
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingBanks, setLoadingBanks] = useState(true); // Track bank fetch status
  const [form] = Form.useForm();
  const [req,setreq] = useState();

  useEffect(() => {
    fetchBalance();
    fetchBanks();
  }, []);

  const fetchBalance = async () => {
    const data = await getBalance();
    if (data.error) {
      notification.error({ message: "Error fetching balance", description: data.error });
    } else {
      setBalance(data.balance || 0);
      setreq(data.req)
    }
  };

  const fetchBanks = async () => {
    setLoadingBanks(true);
    const data = await getBankAccounts();
    setLoadingBanks(false);

    if (data.error) {
      notification.error({ message: "Error fetching bank accounts", description: data.error });
    } else {
        console.log('hi',data)
      setBanks(data || []);
    }
  };

  const handleWithdraw = async () => {
    if (!selectedBank) {
      return notification.error({ message: "Please select a bank account" });
    }
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      return notification.error({ message: "Enter a valid withdrawal amount" });
    }
    if (Number(amount) > balance) {
      return notification.error({ message: "Withdrawal amount exceeds balance" });
    }
    if (!agree) {
      return notification.error({ message: "You must agree to the terms and conditions" });
    }

    setLoading(true);
    const request = { amount: Number(amount), bank_id: selectedBank };
    const response = await raiseWithdrawal(request);
    setLoading(false);

    if (response.error) {
      notification.error({ message: "Withdrawal failed", description: response.error });
    } else {
      notification.success({ message: "Withdrawal successful" });
      setAmount("");
      form.resetFields();
      fetchBalance(); // Refresh balance
    }
  };

  return (
    <div style={{ maxWidth: 720, margin: "auto", padding: "20px" }}>
      <Card title="Wallet Balance" variant="bordered">
        <Typography.Title level={2}>${balance}</Typography.Title>
      </Card>

     {!req? <Card title="Raise Withdrawal" variant="bordered" style={{ marginTop: 20 }}>
        {loadingBanks ? (
          <Spin size="large" />
        ) : banks.length === 0 ? (
          <Typography.Text type="danger">
            No bank accounts found. Please add a bank account to proceed.
          </Typography.Text>
        ) : (
          <Form form={form} layout="vertical">
            <Form.Item label="Select Bank">
              <Select placeholder="Choose a bank" onChange={setSelectedBank}>
                {banks.map((bank) => (
                  <Select.Option key={bank.textId} value={bank.textId}>
{bank.bank} {bank.acno?.slice(-4)}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              label="Enter Amount"
              validateStatus={amount > balance ? "error" : ""}
              help={amount > balance ? "Amount exceeds available balance" : ""}
            >
              <Input
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </Form.Item>

            <Form.Item>
              <Checkbox checked={agree} onChange={(e) => setAgree(e.target.checked)}>
                I have read and agree to the terms and conditions
              </Checkbox>
            </Form.Item>

            <Button type="primary" block onClick={handleWithdraw} loading={loading}>
              Withdraw
            </Button>
          </Form>
        )}
      </Card>:        <Typography.Title level={2}>You have a pending withdrawl</Typography.Title>
}
    </div>
  );
};

export default WalletWithdrawal;
